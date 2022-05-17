import React, { useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { accountSchema } from '../../validations/accountSchema'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'

const Account = () => {

  let navigate = useNavigate();

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');

  const { auth, setAuth } = useAuth();
  

  const handleSubmit = async (values, actions) => {
    try {
      if (document.activeElement.dataset.flag === 'update'){

        let req = { ...values, confirmpassword: '' };

        for (const key in req) {
          if (req[key] === '' || req[key] === null || req[key] === undefined)
          delete req[key]
        }
      
        console.log({ ...req })
        const response = await axios.patch(`/user/${auth.id}/account`,
        JSON.stringify({ ...req }),
        {
          headers: { 
            'Access-Control-Allow-Origin' : 'http://localhost:3000',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ auth.accessToken }`,
          },
          withCredentials: true,
        });
        if (!response) throw new Error('Le serveur ne répond pas');

        delete req.password
        setAuth({ ...auth, ...req });
      }

      if (document.activeElement.dataset.flag === 'delete') {
        console.log({ ...values });
        const response = await axios.delete(`/user/${auth.id}/account`,
        {
          headers: {
            'Access-Control-Allow-Origin' : 'http://localhost:3000',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ auth.accessToken }`,
          },
         data : JSON.stringify({ ...values }), 
        });
        if (!response) throw new Error('Le serveur ne répond pas');

        await setAuth({});
        navigate('/auth/signup', { replace: true });
        
      }
    } catch (error) {
      console.log(error);
      if (!error.response) setErrorMsg('Le serveur ne répond pas.')
      if (error.response?.status) setErrorMsg(`Erreur ${ error.response.status } : ${ error.response.data.message ? error.response.data.message : error.response.statusText }`)
    }
  };


  return (
    <section className='account'>
      <Formik 
        initialValues={{ username: '', email: '', newpassword: '', confirmpassword: '', password: '' }}
        validationSchema={ accountSchema }
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
                placeholder={`${auth.username}`}
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

            <label htmlFor='email'>Adresse mail</label>
            <div>
              <Field 
                type='text' 
                name='email' 
                id='email'
                autoComplete='off'
                placeholder={`${auth.email}`}
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
            

            <label htmlFor='newpassword'>Nouveau mot de passe</label>
              <div>
                <Field 
                  type='password' 
                  name='newpassword' 
                  id='newpassword'
                  autoComplete='off'
                  placeholder='Votre nouveau mot de passe'
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
                placeholder='Votre nouveau mot de passe'
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

            <label htmlFor='password'>Mot de passe actuel</label>
            <div>
              <Field 
                type='password' 
                name='password' 
                id='password' 
                placeholder='Votre mot de passe'
                autoComplete='off'
                required
                // aria-invalid={ errors.password ? 'false' : 'true' }
                // ariadescribedby='passwordnote'
                />
                {/* { errors.newpassword && touched.newpassword ?
                  <span><FontAwesomeIcon icon={ faTimes }/></span>
                  : <span><FontAwesomeIcon icon={ faCheck }/></span> } */}
                { errors.password && touched.password ? 
                  (<div id='passwordnote'><FontAwesomeIcon icon={ faInfoCircle } />{ errors.password }</div>) 
                  : null}
            </div>
          </div> 
          <div>
            <button className='focus-button' type='submit' data-flag='update'>Sauvegarder les changements</button>
            <button className='focus-button alert-button' type='submit' data-flag='delete'>Supprimer le compte</button>
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
  
}

export default Account