import React, { useState, useRef } from 'react'
import { Formik, Form, Field } from 'formik';
import { forgotModifySchema } from '../../../validations/forgotModifySchema';
import axios from '../../../api/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle, faCheck } from '@fortawesome/free-solid-svg-icons';


const ForgotModifyForm = () => {

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  let navigate = useNavigate();

  let [ searchParams ] = useSearchParams();

  
  const handleSubmit = async (values, actions) => {

    try {

      const response = await axios.post('auth/forgot/modify',
      JSON.stringify({ ...values }),
      {
        headers: { 
          'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        params: {
          username: searchParams.get('username'),
          retriever: searchParams.get('retriever'),
        },
      });
      //console.log(response.data)
      if (!response) throw new Error('Le serveur ne répond pas ');

      navigate('/login', { replace: true });
  
    } catch (error) {
      console.log(error);
      if (!error.response) return setErrorMsg('Le serveur ne répond pas.')
      if (error.response?.status === 409) return setErrorMsg('Votre nouveau mot de passe doit être différent du précédent')
      if (error.response?.status) return setErrorMsg(`Erreur ${error.response.status} : ${error.response.data.message ? error.response.data.message : error.response.statusText}`)
    }
  }

  return (
    <section className='authentication border'>
      <h1>Changez de mot de passe</h1>
      <Formik 
        initialValues={{ newpassword: '', confirmpassword: ''}}
        validationSchema={ forgotModifySchema }
        onSubmit={ handleSubmit }
      >
       { ({ values, errors, touched }) => (
        <Form className='form forgot-form'>
          <label htmlFor='newpassword'>Nouveau mot de passe</label>
              <div>
                <Field 
                  type='password' 
                  name='newpassword' 
                  id='newpassword'
                  autoComplete='off'
                  placeholder='Mot de passe'
                  aria-invalid={ errors.newpassword ? 'false' : 'true' }
                  ariadescribedby='newpasswordnote'
                  />
                { !touched.newpassword || values.newpassword === '' ?
                  null : errors.newpassword && touched.newpassword ?
                  <span><FontAwesomeIcon icon={ faTimes }/></span>
                  : <span><FontAwesomeIcon icon={ faCheck }/></span> }
                { errors.newpassword && touched.newpassword ? 
                  (<div id='newpasswordnote'><FontAwesomeIcon icon={ faInfoCircle } />{ errors.newpassword }</div>) 
                  : null}
              </div>
              
              <label htmlFor='confirmpassword'>Confirmez votre nouveau mot de passe</label>
              <div>
                <Field 
                  type='password' 
                  name='confirmpassword' 
                  id='confirmpassword'
                  autoComplete='off'
                  placeholder='Mot de passe'
                  aria-invalid={ values.newpassword !== values.confirmpassword && touched.confirmpassword ? 'false' : 'true' }
                  ariadescribedby='confirmpasswordnote'
                  />
                { !touched.newpassword || values.newpassword === '' ?
                  null : values.newpassword !== values.confirmpassword && touched.confirmpassword ?
                  <span><FontAwesomeIcon icon={ faTimes }/></span>
                  : <span><FontAwesomeIcon icon={ faCheck }/></span> }
                { values.newpassword !== values.confirmpassword && touched.confirmpassword ? 
                  (<div id='confirmpasswordnote'><FontAwesomeIcon icon={ faInfoCircle } />Le mot de passe de confirmation est différent</div>) 
                  : null}
              </div>

          <button className='focus-button' type='submit'>Envoyer</button>
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
  );
};

export default ForgotModifyForm