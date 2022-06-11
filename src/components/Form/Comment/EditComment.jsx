import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { InformationCircleIcon } from '@heroicons/react/solid'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import PreviewImage from '../../Layouts/PreviewImage'
import { PhotographIcon } from '@heroicons/react/outline'
import { yupResolver } from '@hookform/resolvers/yup';
import { commentSchema } from '../../../validations/commentSchema'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'

const EditComment = ({id, textcontent, media, User=[], UserId, edit, setComments }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const mediaRef = useRef();
    const axiosPrivate = useAxiosPrivate();
    const [image, setImage] = useState(null);
    const [currentMedia, setCurrentMedia] = useState(media);

    const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors, isSubmitting },
    } = useForm({ 
      resolver: yupResolver(commentSchema),
      mode: 'onSubmit',
      defaultValues: {
        textcontent: textcontent,
        media: currentMedia,
      }
    })


    const deleteCommentImage = async (data, id) => {
      try {
        const response = await axiosPrivate.patch(`/comment/${id}`,
          JSON.stringify(data),
          {
            headers: { 'Content-Type': 'application/json'},
          });
        if (!response) throw new Error('Le serveur ne répond pas')
    
        const newComment = { id, media, textcontent, UserId, User, ...response.data.Comment};
    
        reset();
        edit();
        toast.success(`Commentaire modifié`)
        return setComments((prev) => prev.map((item) => item.id === id ? newComment : item));
  
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) toast.warning(`Vous n'êtes pas autorisé à effectuer cette action`);
        navigate('/login', { state: { from: location}, replace: true })
      }
    }

    const updateCommentContent = async (formData, id) => {
      try {
        const response = await axiosPrivate.patch(`/comment/${id}`, 
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data'},
          });
      if (!response) throw new Error('Le serveur ne répond pas');
  
      const newComment = { id, media, textcontent, UserId, User, ...response.data.Comment };
  
      reset();
      edit();
      toast.success(`Commentaire modifié`);
      return setComments((prev) => prev.map((item) => item.id === id ? newComment : item));
  
      } catch (error) {
        console.log(error)
        if (error.response?.status === 401) toast.warning(`Vous n'êtes pas autorisé à effectuer cette action`);
        navigate('/login', { state: { from: location}, replace: true })
      }
    }

    const updatePostText = async (data, id) => {
      try {
        const response = await axiosPrivate.patch(`/comment/${id}`,
          JSON.stringify(data),
          {
            headers: { 'Content-Type': 'application/json' },
          });
        if (!response) throw new Error('Le serveur ne répond pas');
  
        const newComment = { id, media, textcontent, UserId, User, ...response.data.Comment};
        
        reset();
        edit();
        toast.success(`Commentaire modifié`)
        return setComments((prev) => prev.map((item) => item.id === id ? newComment : item));
  
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) toast.warning(`Vous n'êtes pas autorisé à effectuer cette action`);
        navigate('/login', { state: { from: location}, replace: true })
      } 
    }

    const onSubmit= (data) => {
      if (!data.media) return deleteCommentImage(data, id);
      if (typeof data.media === 'string') return updatePostText(data, id);

      for (const key in data) {
        if (data[key] === '' || data[key] === null || data[key] === undefined) delete data[key]
      };

      let formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === 'media') {
          formData.append('media', value[0])
        }
        formData.append(`${key}`, value);
      }

      return updateCommentContent(formData, id);
    }

    const deleteImage = () => {
      mediaRef.current.value = null;
      setImage(null);
      setValue('media', null);
      setCurrentMedia(null);
    }

    const resetImage = () => {
      mediaRef.current.value = null;
      setValue('media', media);
      setImage(null);
    }
  
    return (
      <form className='flex flex-col p-2 z-10 bg-white flex-1 gap-y-2' onSubmit={handleSubmit(onSubmit)}> 
        <div className='flex flex-col mob:flex-row gap-3'>
          <div className='flex flex-col flex-1' >
            <label>Texte du commentaire</label>
            <textarea
            {...register('textcontent')}
            type='textarea'
            name='textcontent'
            placeholder='Ecrivez votre article'
            className='basic-input h-40'
            />
          </div>

        <div className='flex'>
          <div className='flex items-center gap-3 mob:mt-6'>
            <div className='py-2 px-3 border rounded border-gray-300 bg-gray-100'>
            {image ?
            <PreviewImage file={image} css='h-32 w-32 rounded object-cover' />
            :
              currentMedia ? 
                <img src={media} className='h-32 w-32 rounded object-cover' crossOrigin='anonymous' alt='illustration du post'/>  
                :
                <PhotographIcon className='w-32 h-32 mt-1 text-gray-500' />
          }
            </div>
            <div className='flex flex-col space-y-3'>
              <div className='flex flex-col relative'>
                <input
                  {...register('media')}
                  type='file'
                  accept='image/jpg, image/jpeg, image/png, image/webp, image/gif, image/svg'
                  name='media'
                  ref={mediaRef}
                  className='absolute inset-0 opacity-0 cursor-pointer'
                  aria-describedby='note'
                  aria-invalid={errors?.media ? true : false}
                  onChange={ (e) => {
                    setImage(e.target.files[0]);
                    setValue('media', e.target.files)
                  } } 
                />
                <button className=' px-3 py-1 rounded-full gray-button'>{ !currentMedia && !image ? `Ajouter une image` : `Changer d'image`}</button>   
              </div>
              {image ? 
                <button 
                className='px-3 py-1 gray-button hover-button rounded-full'
                type='button' 
                onClick={ () => resetImage() }
                >
                  Annuler le changement
                </button> 
                : null
              }
              {currentMedia ? 
                <button
                  className='px-3 py-1 orange-button hover-button rounded-full'
                  type='button' 
                  onClick={ () => deleteImage() }
                >
                  Supprimer l'image
                </button> 
                : null
              }
            </div>
          </div>   
        </div>
        {errors?.textcontent && errors?.media ? 
          <div className=' flex items-center space-x-1'>
            <InformationCircleIcon className='h-4 w-4 text-slate-900' /><p id='note'>{errors.textcontent?.message}</p>
          </div> : null
        }
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <button 
          type='submit'
          className='flex-1 w-full rounded-full gray-button hover-button p-2' 
          disabled={isSubmitting ? true : false}
        > 
          Modifier votre commentaire
        </button>
      </div>
    </form>
  )
}

export default EditComment