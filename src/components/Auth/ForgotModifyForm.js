import React, { useState, useRef } from 'react'
import { Formik, Form } from 'formik';
import { forgotModifySchema } from '../../validations/forgotModifySchema';
import CustomInput from '../Form/CustomInput';
import axios from '../../api/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const inputs = [
  {
    id:1,
    name: 'newpassword',
    type: 'password',
    placeholder: 'Nouveau mot de passe',
    autoComplete: 'off',
    required: true,
  },
];


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

      navigate('auth/login', { replace: true });
  
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
        initialValues={{ newpassword: '' }}
        validationSchema={ forgotModifySchema }
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

export default ForgotModifyForm