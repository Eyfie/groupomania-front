import React, { useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import useAuth from '../../hooks/useAuth';
import { profilSchema } from '../../validations/accountSchema'
import PreviewImage from '../Form/PreviewImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';


const Profil = () => {

  const avatarRef = useRef(null);
  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const { auth, setAuth } = useAuth();

  const handleSubmit = async (values, action) => {
    try {

      let formData = new FormData();

      for (const key in values) {
        if (values[key] === '' || values[key] === null || values[key] === undefined) delete values[key]
      };
      
      for (const [key, value] of Object.entries(values)) {
        console.log(`${key}`, value);
        formData.append(`${key}`, value);
      };
    
      const response = await axios.patch(`/user/${auth.id}/account`,
           formData,
          {
            headers: { 
              'Access-Control-Allow-Origin' : 'http://localhost:3000',
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${ auth.accessToken }`,
            },
            withCredentials: true,
          });
          if (!response) throw new Error('Le serveur ne répond pas');

          values.file = undefined;

          setAuth({ ...auth, ...values });
      
    } catch (error) {
      console.log(error);
      if (!error.response) setErrorMsg('Le serveur ne répond pas.')
      if (error.response?.status) setErrorMsg(`Erreur ${ error.response.status } : ${ error.response.data.message ? error.response.data.message : error.response.statusText }`)
    }
  };

    console.log(auth);
 
  return (
    <section className='account'>
      <Formik 
        initialValues={{ firstname: '', lastname: '', description: '', avatar: null }}
        validationSchema={ profilSchema }
        onSubmit={ handleSubmit }
      >

       {({ values, errors, touched, setFieldValue }) => (
        <Form className='form profil-form'>
          <div>
            <h2>Informations du profil</h2>

            <div>
            <label htmlFor='firstname'>Prénom</label>
            <Field 
                type='text' 
                name='firstname' 
                id='firstname'
                autoComplete='off'
                placeholder={`${auth.firstname}`}
                aria-invalid={ errors.firstname ? 'false' : 'true' }
                ariadescribedby='firstnamenote'
                />
              { !touched.firstname || values.firstname === '' ?
                null : errors.firstname && touched.firstname ?
                  <span><FontAwesomeIcon icon={ faTimes }/></span>
                  : <span><FontAwesomeIcon icon={ faCheck }/></span> }
              { errors.firstname && touched.firstname ?
                (<div id='firstnamenote'><FontAwesomeIcon icon={ faInfoCircle }/>{ errors.firstname }</div>) 
                : null }

              <label htmlFor='lastname'>Nom</label>
              <Field 
                type='text' 
                name='lastname' 
                id='lastname'
                autoComplete='off'
                placeholder={`${auth.lastname}`}
                aria-invalid={ errors.lastname ? 'false' : 'true' }
                ariadescribedby='lastnamenote'
                />
              { !touched.lastname || values.lastname === '' ?
                null : errors.lastname && touched.lastname ?
                  <span><FontAwesomeIcon icon={ faTimes }/></span>
                  : <span><FontAwesomeIcon icon={ faCheck }/></span> }
              { errors.lastname && touched.lastname ?
                (<div id='lastnamenote'><FontAwesomeIcon icon={ faInfoCircle }/>{ errors.lastname }</div>) 
                : null }

            </div>

            <label htmlFor='description'>Décrivez vous brièvement</label>
            <Field 
               type='textarea' 
               name='description' 
               id='description'
               autoComplete='off'
               placeholder={`${auth.description}`}
               aria-invalid={ errors.description ? 'false' : 'true' }
               ariadescribedby='descriptionnote' 
            />
            { errors.description && touched.description ?
                (<div id='descriptionnote'><FontAwesomeIcon icon={ faInfoCircle }/>{ errors.description }</div>) 
                : null }

          </div> 
          <div>
            <h2>Avatar</h2>
            <input 
              ref={avatarRef}
              hidden
              type='file' 
              name='avatar'
              onChange={ (e) => { setFieldValue('avatar', e.target.files[0]) } }
            />
            { values.avatar ? 
              values.avatar && <PreviewImage file={values.avatar} />
              : <img crossOrigin='anonymous'src={auth.avatar} alt='avatar'/> }
            <button type="button" onClick={ () => { avatarRef.current.click() } }>Changer d'image</button>
          </div>
          <button type='submit'>Sauvegarder les changements</button>
         
        </Form>
       )}
      </Formik>
      <p 
        ref={errorRef}
        className={errorMsg ? 'error-msg' : 'offscreen'}
        aria-live='assertive'
      >
        {errorMsg}
      </p>
    </section>
  )
}

export default Profil