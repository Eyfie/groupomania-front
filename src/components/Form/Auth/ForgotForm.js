import React, { useState, useRef } from 'react'
import { Formik, Form, Field } from 'formik';
import { forgotSchema } from '../../../validations/forgotSchema';
import axios from '../../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle, faCheck } from '@fortawesome/free-solid-svg-icons';


const ForgotForm = () => {

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (values, actions) => {

    try {
      const response = await axios.post('auth/forgot',
      JSON.stringify({ ...values }),
      {
        headers: { 
          'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(response)
      if (!response) throw new Error('Le serveur ne répond pas ');
  
    } catch (error) {
      console.log(error);
      if (!error.response) setErrorMsg('Le serveur ne répond pas.')
      if (error.response?.status) setErrorMsg(`Erreur ${error.response.status} : ${error.response.data.message ? error.response.data.message : error.response.statusText}`)
    }
  }

  return (
    <section className='authentication border'>
      <h2>Rentrez votre adresse mail</h2>
      <Formik 
        initialValues={{ email: '' }}
        validationSchema={ forgotSchema }
        onSubmit={ handleSubmit }
      >
       { ({ values, errors, touched }) => (
        <Form className='form forgot-form'>
          <label htmlFor='email'>Adresse mail</label>
          <div>
            <Field 
              className='border'
              type='email' 
              name='email' 
              id='email'
              required
              placeholder='exemple@gmail.com'
              aria-invalid={ errors.email ? 'false' : 'true' }
              ariadescribedby='emailnote'
              />

              { !touched.email || values.email === '' ?
                null : errors.email && touched.email ?
                <span><FontAwesomeIcon icon={ faTimes }/></span>
                : <span><FontAwesomeIcon icon={ faCheck }/></span> }
              { errors.email && touched.email ? 
                (<div id='emailnote'><FontAwesomeIcon icon={ faInfoCircle } />{ errors.email }</div>) 
                : null}
            </div>
          <button className='auth-link__focus' type='submit'>Envoyer</button>
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

export default ForgotForm