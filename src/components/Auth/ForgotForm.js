import React, { useState, useRef } from 'react'
import { Formik, Form } from 'formik';
import { forgotSchema } from '../../validations/forgotSchema';
import CustomInput from '../CustomInput';
import axios from '../../api/axios';

const inputs = [
  {
    id:1,
    name: 'email',
    type: 'email',
    placeholder: 'Votre e-mail',
    autoComplete: 'off',
    required: true,
  },
];


const ForgotForm = () => {

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (values, actions) => {

    try {
      console.log({...values});
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
       {(props) => (
        <Form className='form forgot-form'>
          { inputs.map((input) => (<CustomInput key={ input.id } { ...input } />))}
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

export default ForgotForm