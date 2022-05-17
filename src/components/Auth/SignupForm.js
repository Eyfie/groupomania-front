import React, { useState, useRef } from 'react'
import { Formik, Form, Field } from 'formik';
import { signupSchema } from '../../validations/signupSchema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';


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

      navigate('/auth/login', { replace: true });
  
    } catch (error) {
      console.log(error);
      if (!error.response) setErrorMsg('Le serveur ne répond pas.')
      if (error.response?.status) setErrorMsg(`Erreur ${error.response.status} : ${error.response.data.message ? error.response.data.message : error.response.statusText}`)
    }
  }

  return (
    <section className='account'>
      <Formik 
        initialValues={{ username: '', firstname: '', lastname: '', email: '', password: '' }}
        validationSchema={ signupSchema }
        onSubmit={ handleSubmit }
      >

       { ({ values, errors, touched }) => (
        <Form className='form account-form'>
          <div>
            <h2>Informations du profil</h2>

            <label htmlFor='username'>Nom d'utilisateur</label>
            <div>
              <Field 
                type='text' 
                name='username' 
                id='username'
                autoComplete='off'
                placeholder='Votre pseudo'
                aria-invalid={ errors.username ? 'false' : 'true' }
                ariadescribedby='usernamenote'
                />
              { !touched.username || values.username === '' ?
                null : errors.username && touched.username ?
                  <span><FontAwesomeIcon icon={ faTimes }/></span>
                  : <span><FontAwesomeIcon icon={ faCheck }/></span> }
              { errors.username && touched.username ?
                (<div id='usernamenote'><FontAwesomeIcon icon={ faInfoCircle }/>{ errors.username }</div>) 
                : null }
            </div>

            <label htmlFor='firstname'>Prénom</label>
            <div>
              <Field 
                type='text' 
                name='firstname' 
                id='firstname'
                placeholder='Votre prénom'
                aria-invalid={ errors.firstname ? 'false' : 'true' }
                ariadescribedby='firstnamenote'
                />
              { !touched.firstname || values.firstname === '' ? 
                null : errors.firstname && touched.firstname ?
                  <span><FontAwesomeIcon icon={ faTimes }/></span>
                  : <span><FontAwesomeIcon icon={ faCheck }/></span> }
              { errors.firstname && touched.firstname ? 
                (<div id='firstnamenote'><FontAwesomeIcon icon={ faInfoCircle } />{ errors.firstname }</div>) 
                : null}
              </div>
            

              <label htmlFor='lastname'>Nom</label>
              <div>
                <Field 
                  type='text' 
                  name='lastname' 
                  id='lastname'
                  placeholder='Votre nom'
                  aria-invalid={ errors.lastname ? 'false' : 'true' }
                  ariadescribedby='lastnamenote'
                  />
                { !touched.lastname || values.lastname === '' ?
                  null : errors.lastname && touched.lastname ?
                  <span><FontAwesomeIcon icon={ faTimes }/></span>
                  : <span><FontAwesomeIcon icon={ faCheck }/></span> }
                { errors.lastname && touched.lastname ? 
                  (<div id='lastnamenote'><FontAwesomeIcon icon={ faInfoCircle } />{ errors.lastname }</div>) 
                  : null}
              </div>

              <label htmlFor='email'>Adresse mail</label>
              <div>
                <Field 
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

           

            <label htmlFor='password'>Mot de passe actuel</label>
            <div>
              <Field 
                type='password' 
                name='password' 
                id='password' 
                placeholder='Votre mot de passe'
                autoComplete='off'
                required
                aria-invalid={ errors.password ? 'false' : 'true' }
                ariadescribedby='passwordnote'
                />
                { errors.newpassword && touched.newpassword ?
                  <span><FontAwesomeIcon icon={ faTimes }/></span>
                  : <span><FontAwesomeIcon icon={ faCheck }/></span> }
                { errors.password && touched.password ? 
                  (<div id='passwordnote'><FontAwesomeIcon icon={ faInfoCircle } />{ errors.password }</div>) 
                  : null}
            </div>
          </div> 
          <div>
            <button className='auth-link__focus' type='submit'>S'inscrire</button>
          </div>
        </Form>
       )}
      </Formik>
      <p 
        ref={ errorRef }
        className={ errorMsg ? 'error-msg' : 'offscreen' }
        aria-live='assertive'
      >
        { errorMsg }
      </p>
    </section>
  )
};

export default SignupForm