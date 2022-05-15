import React, { useState } from 'react'
import { useField } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const CustomInput = (props) => {

  const[focus, setFocus] = useState(false);
  const [field, meta] = useField(props);

  return (
    <>
      <input 
        { ...field } 
        { ...props }
        onFocus={ () => setFocus(true) }
        onBlur={ () => setFocus(false) }
        aria-describedby={`${props.name}note`}
        aria-invalid={ !meta.error ? 'false' : 'true' }
        className={ `border ${ !focus && meta.error ? 'wrong-input' : 'valid-input' }` }
      />
      <p id={ `${props.name}note` } className={ focus && meta.error ? 'instruction' : 'offscreen' }>
          <FontAwesomeIcon icon={ faInfoCircle } /> {meta.error}
      </p>
    </>
  )
}

export default CustomInput