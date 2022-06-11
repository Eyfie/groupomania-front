import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Avatar from '../../Widgets/AvatarWidget';
import { PhotographIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../../../validations/postSchema';
import PreviewImage from '../../Layouts/PreviewImage';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';




const CreatePost = ({ setPosts }) => {


  const navigate = useNavigate();
  const location = useLocation();
  
  
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ 
    resolver: yupResolver(postSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      textcontent: '',
      media: null,
    }
  });


  const onSubmit = async (data) => {
    try {

      for (const key in data) {
        if (data[key] === '' || data[key] === null || data[key] === undefined) delete data[key]
      };

      if(data.media) {

        let formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
          if (key === 'media') formData.append('media', value[0])
          formData.append(`${key}`, value);
        }

        const response = await axiosPrivate.post(`/post`,
              formData,
              {
                headers: { 'Content-Type': 'multipart/form-data' },
              });

              if (!response) throw new Error('Le serveur ne répond pas');

              setImage(null);
              toast.success('Post créé !');
              reset();
              return setPosts((prev) => [{...response.data.Post, User: auth}, ...prev]);
      }

      const response = await axiosPrivate.post(`/post`,
      JSON.stringify(data),
      {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response) throw new Error('Le serveur ne répond pas');

      toast.success('Post créé !')
      reset();
      return setPosts((prev) => [{...response.data.Post, User: auth}, ...prev]);
      


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
    <form className='flex flex-col p-2 z-10 bg-white rounded border-gray-300 border gap-y-2 sticky top-16' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-center gap-2'>
        <Avatar url={auth.avatar} />

        <input
        {...register('title', { required: true } ) } 
          type='text'
          name='title'
          placeholder='Créez votre post en entrant votre titre'
          className='basic-input truncate'
        />
        <p className='flex items-start'>{errors.title?.message}</p>
      </div>

      {watch('title') && (
        <>
          <div className='flex flex-col' >
            <label>Texte du post</label>
            <textarea
            {...register('textcontent')}
            type='textarea'
            name='textcontent'
            placeholder='Ecrivez votre article'
            className='basic-input'
            />
          </div>

          <div className='flex items-center justify-center flex-1'>
            <div className='flex items-center flex-col relative'>
                <div className='flex items-center gap-3'>

                  <div className='py-2 px-3 border rounded border-gray-300 bg-gray-100'>
                    {image ? 
                      <PreviewImage file={image} css='h-40 w-40 rounded object-cover' />
                      : <PhotographIcon className='w-40 h-40 mt-1 text-gray-500' />
                    }
                  </div>
                  <div className='flex-col space-y-2 justify-center'>
                    <div className='relative flex'>
                      <button type='button' className='flex-1 rounded-full px-3 py-1 gray-button'>{image ? `Changer d'image` : 'Ajouter une image'}</button>
                      <input
                        {...register('media')}
                        type='file'
                        accept='image/jpg, image/jpeg, image/png, image/webp, image/gif, image/svg'
                        name='media'
                        className='absolute inset-0 opacity-0 cursor-pointer'
                        onChange={ (e) => setImage(e.target.files[0]) } 
                      />
                    </div>
                    
                    {image && (
                      <div className='flex'>
                        <button 
                            className='flex-1 orange-button hover-button rounded-full px-3 py-1'
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
          </div>
          <div className='flex items-center gap-2 mt-2'>
            <button 
              type='submit'
              className='flex-1 w-full rounded-full gray-button hover-button p-2' 
              disabled={isSubmitting ? true : false}
            > 
              Créez votre post
            </button>
            <button
              className='flex-1 w-full rounded-full orange-button hover-button p-2'
              type='button' 
              onClick={() => { 
                reset({ title: '', textcontent: '', media: null});
                setImage(null); 
              }}>
              Annuler le post
            </button>
          </div>
        </>
      )}
    </form>
  )
}

export default CreatePost