/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver }  from '@hookform/resolvers/yup'
import { profilSchema } from '../../../validations/accountSchema'
import PreviewImage from '../../Layouts/PreviewImage';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';


const Profil = () => {

  const navigate = useNavigate();
  const location = useLocation()

  const avatarRef = useRef();
  const { auth, setAuth } = useAuth();
  const [image, setImage] = useState();

  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ 
    resolver: yupResolver(profilSchema),
    mode: 'onChange',
    defaultValues: {
      firstname: '',
      lastname: '',
      description: '',
      avatar: null,
    }
  })

  const updateWithAvatar = async (data, id) => {
      try {
        let formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
          if (key === 'avatar') formData.append('avatar', value[0])
          formData.append(`${key}`, value);
        };
      
        const response = await axiosPrivate.patch(`/user/${id}`,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
        if (!response) throw new Error('Le serveur ne répond pas');

        reset()
        setImage(null);
        toast.success(`Compte mis à jour !`);
        return setAuth({ ...auth, ...response.data.User });
      } catch (error) {
        if (error.response.status === 401) toast.warning(`Vous n'êtes pas autorisé à effectuer cette action`);
        navigate('/login', { state: { from: location}, replace: true })
      }
        
  }

  const updateWithoutAvatar = async (data, id) => {
    try {
      const response = await axiosPrivate.patch(`/user/${id}`,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json'},
        });
      if (!response) throw new Error('Le serveur ne répond pas');

      reset()
      toast.success(`Compte mis à jour !`);
      setAuth({...auth, ...response.data.User});
    } catch (error) {
      if (error.response.status === 401) toast.warning(`Vous n'êtes pas autorisé à effectuer cette action`);
      navigate('/login', { state: { from: location}, replace: true })
    }
  }

  const onSubmit = async (data) => {
    try {

      for (const key in data) {
        if (data[key] === '' || data[key] === null || data[key] === undefined) delete data[key]
      };

      if(data.avatar) return updateWithAvatar(data, auth.id);

      return updateWithoutAvatar(data, auth.id);
      
    } catch (error) {
      console.log(error);
      // if (!error.response) setErrorMsg('Le serveur ne répond pas.')
      // if (error.response?.status) setErrorMsg(`Erreur ${ error.response.status } : ${ error.response.data.message ? error.response.data.message : error.response.statusText }`)
    }
  }
 
  return (
    <section className='flex flex-col st:flex-row'>
      <form 
        className='flex flex-col st:flex-row gap-5 st:flex-wrap'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='space-y-3'>
          <h2 className='font-ibm font-semibold uppercase border-b border-grouporange-900'>Informations du profil</h2>
          <div className='flex flex-col mob:flex-row gap-3'>
            <div className='flex-1'>
              <label htmlFor='firstname'>Prénom</label>
              <input
                {...register('firstname')}
                className='basic-input'
                type='text'
                name='firstname'
                autoComplete='off'
                placeholder={auth.firstname}
                aria-invalid={errors?.firstname ? true : false}
                aria-describedby='firstnamenote'
              />
            </div>
            <div className='flex-1'>
              <label htmlFor='lastname'>Nom</label>
              <input
                {...register('lastname')}
                className='basic-input'
                type='text'
                name='lastname'
                autoComplete='off'
                placeholder={auth.lastname}
                aria-invalid={errors?.lastname ? 'true' : 'false'}
                aria-describedby='lastnamenote'
              />
            </div>
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <textarea
              {...register('description')}
              className='basic-input h-32 st:h-64'
              name='description'
              autoCorrect='on'
              autoComplete='off'
              placeholder={auth.description}
              aria-invalid={errors?.description ? 'true' : 'false'}
              aria-describedby='descriptionnote'
            />
          </div>
        </div>
        <div className='flex-1'>
          <h2 className='font-ibm font-semibold uppercase border-b border-grouporange-900'>Avatar</h2>
          <div className='mt-6 flex flex-col'>
            <div className='rounded-full h-64 w-64 flex mx-auto'>
              {image ?
                <PreviewImage file={image} css='object-cover h-64 w-64 rounded-full'/>
                :
                <img src={auth.avatar} className='object-cover h-64 w-64 rounded-full' alt='Votre avatar' crossOrigin='anonymous'/>
              }
            </div>
            <div className='flex justify-center gap-3 text-white'>
              <div className={ `relative flex ${ image ? 'flex-1' : '' }` }>
                <button 
                  type='button'
                  className={`mt-6 gray-button p-2 rounded-full w-100% ${ image ? 'flex-1' : '' } ` }
                >
                  Changer d'avatar
                </button>
                <input
                  {...register('avatar')}
                  className='absolute inset-0 opacity-0 cursor-pointer'
                  type='file'
                  accept='image/jpg, image/jpeg, image/png, image/webp, image/gif, image/svg'
                  name='avatar'
                  ref={avatarRef}
                  onChange={ (e) => {
                    setImage(e.target.files[0]);
                    setValue('avatar', e.target.files[0])
                  }}
                />
              </div>
              {image ?
                <button 
                  className='mt-6 flex-1 orange-button hover-button p-2 rounded-full'
                  type='button'
                  onClick={ () => {
                    avatarRef.current.value = null;
                    reset({avatar: null});
                    setImage(null);
                  }}
                >
                  Annuler
                </button>
                : null
              }
            </div>
          </div>
        </div>
        <hr  className='mob:hidden'/>
        <div className='st:basis-full mx-auto'>
          <button 
              className='rounded-full gray-button hover-button p-2 flex-1 mob:mt-4'
              type='submit'
            >
              Enregistrer les changements
          </button>
        </div>
      </form>
      
    </section>
  )
}

export default Profil