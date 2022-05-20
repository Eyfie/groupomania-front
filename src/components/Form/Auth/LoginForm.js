import React, { useState, useRef } from 'react'
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginSchema } from '../../../validations/loginSchema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import AuthContext from '../../contexts/AuthProvider';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';


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
       {({ values, errors, touched }) => (
        <Form className='form login-form'>
          
          <label htmlFor='username'>Nom d'utilisateur</label>
          <div>
            <Field
              className='border'
              type='text' 
              name='username' 
              id='username'
              autoComplete='off'
              placeholder='Pseudo'
              aria-invalid={ errors.username ? 'false' : 'true' }
              ariadescribedby='usernamenote'
              />
               { errors.username && touched.username ? 
                  (<div id='usernamenote'><FontAwesomeIcon icon={ faInfoCircle } />{ errors.username }</div>) 
                  : null}
          </div>

          <label htmlFor='password'>Mot de passe</label>
          <div>
            <Field
              className='border'
              type='password' 
              name='password' 
              id='password'
              autoComplete='off'
              placeholder='Mot de passe'
              aria-invalid={ errors.password ? 'false' : 'true' }
              ariadescribedby='passwordnote'
              />
               { errors.password && touched.password ? 
                  (<div id='passwordnote'><FontAwesomeIcon icon={ faInfoCircle } />{ errors.password }</div>) 
                  : null}
          </div>
          <button className='auth-link__focus'type='submit'>Se connecter</button>
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