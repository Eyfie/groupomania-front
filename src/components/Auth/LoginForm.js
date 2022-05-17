import React, { useState, useRef, useContext } from 'react'
import { Formik, Form } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginSchema } from '../../validations/loginSchema';
import CustomInput from '../Form/CustomInput';
import AuthContext from '../../contexts/AuthProvider';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

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
    name: 'password',
    type: 'password',
    placeholder: 'Mot de passe',
    autoComplete: 'off',
    required: true,
  },
];


const LoginForm = () => {

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const errorRef = useRef();

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (values, actions) => {

    try {
      console.log({...values});
      const response = await axios.post('auth/login',
      JSON.stringify({ ...values }),
      {
        headers: { 
          'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(response.data);
      if (!response) throw new Error('Le serveur ne répond pas ');

      
      setAuth({...response.data.User});

      navigate(from, { replace: true });
  
    } catch (error) {
      console.log(error);
      if (!error.response) setErrorMsg('Le serveur ne répond pas.')
      if (error.response?.status) setErrorMsg(`Erreur ${error.response.status} : ${error.response.data.message ? error.response.data.message : error.response.statusText}`)
    }
  }

  return (
    <section className='authentication border'>
      <h2>Connectez vous à Groupomania !</h2>
      <Formik 
        initialValues={{ username: '', password: '' }}
        validationSchema={ loginSchema }
        onSubmit={ handleSubmit }
      >
       {(props) => (
        <Form className='form login-form'>
          { inputs.map((input) => (<CustomInput key={ input.id } { ...input } />))}
          <button className='focus-button' type='submit'>Se connecter</button>
        </Form>
       )}
      </Formik>
      <p>Mot de passe oublié ? <Link to='/forgot'> Changez le !</Link></p>
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

export default LoginForm