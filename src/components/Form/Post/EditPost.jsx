import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { InformationCircleIcon } from '@heroicons/react/solid'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import PreviewImage from '../../Layouts/PreviewImage'
import { PhotographIcon } from '@heroicons/react/outline'
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../../../validations/postSchema'
import { toast } from 'react-toastify'



const EditPost = ({id, title, textcontent, media, User=[], UserId, edit, setPosts }) => {

  const mediaRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const [image, setImage] = useState(null);
  const [currentMedia, setCurrentMedia] = useState(media);
  // const  { posts, setPosts } = usePosts();
 

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ 
    resolver: yupResolver(postSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: title,
      textcontent: textcontent,
      media: currentMedia,
    }
  })

  const post = {id, title, textcontent, media, User, UserId};

  const deletePostImage = async (data, id) => {

    const response = await axiosPrivate.patch(`/post/${id}`,
    JSON.stringify(data),
    {
      headers: { 'Content-Type': 'application/json'},
    });
    if (!response) throw new Error('Le serveur ne répond pas')

    const newPost = {...post, ...response.data.Post};

    reset();
    edit();
    return setPosts((prev) => prev.map((item) => item.id === id ? newPost : item));

  }

  const updatePostContent = async (formData, id) => {

    const response = await axiosPrivate.patch(`/post/${id}`, 
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data'},
      }
    );
    if (!response) throw new Error('Le serveur ne répond pas');

    const newPost = {...post, ...response.data.Post};

    reset();
    edit();
    return setPosts((prev) => prev.map((item) => item.id === id ? newPost : item));
  }

  const updatePostText = async (data, id) => {
    const response = await axiosPrivate.patch(`/post/${id}`,
    JSON.stringify(data),
    {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response) throw new Error('Le serveur ne répond pas');


    const newPost = {...post, ...response.data.Post};
    
    reset();
    edit();
    return setPosts((prev) => prev.map((item) => item.id === id ? newPost : item));
  }

  const onSubmit = async (data) => {
    try {

      if (!data.media) return deletePostImage(data, id);

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

      return updatePostContent(formData, id);

    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) return toast.error(`Remplissez correctement le formulaire du post`);
    }
  }

  const resetImage = () => {
    mediaRef.current.value = null;
    setValue('media', media);
    setImage(null);
  };

  const deleteImage = () => {
    mediaRef.current.value = null;
    setImage(null);
    setValue('media', null);
    setCurrentMedia(null);
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <div className='items-center gap-2'>
        <label>Titre du post</label>
        <input
        {...register('title') } 
          type='text'
          name='title'
          placeholder='Créez votre post en entrant votre titre'
          className='basic-input truncate'
          aria-describedby='titlenote'
          aria-invalid={errors?.title ? true : false}
        />
        {errors?.title && ( 
          <div className=' flex items-center space-x-1'>
            <InformationCircleIcon className='h-4 w-4 text-slate-900' /><p id='titlenote'>{errors.title?.message}</p>
          </div>
        )}
      </div>

      <div className='' >
        <label className=''>Texte du post</label>
        <textarea
        {...register('textcontent')}
        type='textarea'
        name='textcontent'
        placeholder='Ecrivez votre article'
        className='basic-input'
        aria-describedby='note'
        aria-invalid={errors?.textcontent ? true : false}
        />
        {errors?.textcontent && errors?.media ? 
          <div className=' flex items-center space-x-1'>
            <InformationCircleIcon className='h-4 w-4 text-slate-900' /><p id='note'>{errors.textcontent?.message}</p>
          </div> : null
        }
      </div>
      <div className='flex items-center justify-center gap-3'>
            <div className='py-2 px-3 border rounded border-gray-300 bg-gray-100'>
              {image ?
                <PreviewImage file={image} css='h-40 w-40 rounded object-cover' />
                :
                  currentMedia ? 
                    <img src={media} className='h-40 w-40 rounded object-cover' crossOrigin='anonymous' alt='illustration du post'/>  
                    :
                    <PhotographIcon className='w-40 h-40 mt-1 text-gray-500' />
              }
            </div>
            <div className='flex flex-col space-y-3'>
              <div className='flex flex-col relative'>
                <input
                  {...register('media')}
                  type='file'
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
                <button className=' px-3 py-1 rounded-full bg-slate-900 text-white'>{ !currentMedia && !image ? `Ajouter une image` : `Changer d'image`}</button>   
              </div>
              {image ? 
                <button 
                className='px-3 py-1 bg-slate-900 text-white rounded-full'
                type='button' 
                onClick={ () => resetImage() }
                >
                  Annuler le changement
                </button> 
                : null
              }
              {currentMedia ? 
                <button
                  className='px-3 py-1 bg-orange-500 text-white rounded-full'
                  type='button' 
                  onClick={ () => deleteImage() }
                >
                  Supprimer l'image
                </button> 
                : null}
            </div>   
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <button 
          type='submit'
          className='flex-1 w-full rounded-full bg-slate-800 text-white p-2' 
          disabled={isSubmitting ? true : false}
        > 
          Modifiez le post
        </button>
      </div>
    </form>
  )
}

export default EditPost