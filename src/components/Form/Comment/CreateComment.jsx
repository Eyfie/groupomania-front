import React, { useState} from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useForm } from 'react-hook-form';
import PreviewImage from '../../Layouts/PreviewImage';
import { PhotographIcon } from '@heroicons/react/solid';
import UserWidget from '../../Widgets/UserWidget';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { commentSchema } from '../../../validations/commentSchema';

const CreateComment = ({ postId, setComments }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [image, setImage] = useState(null);

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
      textcontent: '',
      media: null,
    }
  })


  const onSubmit = async (data) => {
    try {
        for (const key in data) {
          if (data[key] === '' || data[key] === null || data[key] === undefined) delete data[key]
        };

        data = {...data, PostId: parseInt(postId, 10)}

        if(data.media) {

        let formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
          if (key === 'media') formData.append('media', value[0])
          formData.append(`${key}`, value);
        }

        const response = await axiosPrivate.post(`/comment`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        if (!response) throw new Error('Le serveur ne répond pas');
        
        
        reset()
        setImage(null);
        toast.success('Commentaire créé !')
        return setComments((prev) => [ ...prev, { ...response.data.Comment, User: auth }]);
      }

      const response = await axiosPrivate.post(`/comment`,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
        });
      if (!response) throw new Error('Le serveur ne répond pas');

    
      reset()
      setImage(null)
      toast.success('Commentaire créé !');
      return setComments((prev) => [ ...prev, { ...response.data.Comment, User: auth }]);

    } catch (error) {
      console.log(error);
      navigate('/login', { state: { from: location}, replace: true })
    }
  }

  const deleteImage = () => {
    setImage(null);
    setValue('media', null);
  };


  return (
      <form className='flex flex-col p-2 z-10 bg-white rounded border-gray-300 border flex-1 gap-y-2' onSubmit={handleSubmit(onSubmit)}> 
        <div className='flex items-center gap-2'>
          <UserWidget {...auth} />
        </div>
        <div className='flex flex-col mob:flex-row gap-3'>
          <div className='flex flex-col flex-1' >
            <label htmlFor='textcontent'>Texte du commentaire</label>
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
                  : <PhotographIcon className='w-32 h-32 text-gray-500' />
                }
              </div>

              <div className='flex-col space-y-2 justify-center'>
                <div className='relative flex'>
                  <button type='button' className='cursor-pointer flex-1 gray-button rounded-full px-3 py-1 '>{image ? `Changer d'image` : 'Ajouter une image'}</button>
                  <input
                    {...register('media')}
                    type='file'
                    accept='image/jpg, image/jpeg, image/png, image/webp, image/gif, image/svg'
                    name='media'
                    className='absolute inset-0 opacity-0'
                    onChange={ (e) => setImage(e.target.files[0]) } 
                  />
                </div>
                
                {image && (
                  <div className='flex'>
                    <button 
                        className='flex-1 rounded-full -3 py-1 orange-button hover-button'
                        type='button' 
                        onClick={() => deleteImage()}
                      >
                      Supprimer l'image
                    </button>
                  </div>
                )}
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
            Créez votre commentaire
          </button>
          <button
            className='flex-1 w-full rounded-full orange-button hover-button p-2'
            type='button' 
            onClick={() => { 
              reset({ title: '', textcontent: '', media: null});
              setImage(null); 
            }}>
            Effacer votre commentaire
          </button>
        </div>
      </form>
  )
}

export default CreateComment;