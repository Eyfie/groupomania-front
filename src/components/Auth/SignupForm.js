import React, { useState, useRef } from 'react'
import { Formik, Form } from 'formik';
import { signupSchema } from '../../validations/signupSchema';
import CustomInput from '../CustomInput';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const inputs = [
  {
    id:1,
    name: 'username',
    type: 'text',
    placeholder: 'Pseudo',
    autoComplete: 'off',
    required: true,
  },
  {
    id:2,
    name: 'firstname',
    type: 'text',
    placeholder: 'Prénom',
    autoComplete: 'off',
    required: true,
  },
  {
    id:3,
    name: 'lastname',
    type: 'text',
    placeholder: 'Nom',
    autoComplete: 'off',
    required: true,
  },
  {
    id:4,
    name: 'email',
    type: 'email',
    placeholder: 'Adresse e-mail',
    autoComplete: 'off',
    required: true,
  },
  {
    id:5,
    name: 'password',
    type: 'password',
    placeholder: 'Mot de passe',
    autoComplete: 'off',
    required: true,
  },
];




const SignupForm = () => {

  const navigate = useNavigate();
  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (values, actions) => {

    try {
      console.log({values});
      const response = await axios.post('auth/signup',
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

      navigate('/login', { replace: true });
  
    } catch (error) {
      console.log(error);
      if (!error.response) setErrorMsg('Le serveur ne répond pas.')
      if (error.response?.status) setErrorMsg(`Erreur ${error.response.status} : ${error.response.data.message ? error.response.data.message : error.response.statusText}`)
    }
  }

  return (
    <section className='authentication border'>
      <h2>Créez votre compte Groupomania</h2>
      <Formik 
        initialValues={{ username: '', firstname: '', lastname: '', email: '', password: '' }}
        validationSchema={ signupSchema }
        onSubmit={ handleSubmit }
      >
       {(props) => (
        <Form className='form signup-form'>
          { inputs.map((input) => (<CustomInput key={ input.id } { ...input } />))}
          <button className='focus-button' type='submit'>S'inscrire</button>
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

export default SignupForm