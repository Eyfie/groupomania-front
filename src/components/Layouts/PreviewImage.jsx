import React, { useState, useEffect } from 'react'


const PreviewImage = ({ file, css }) => {

  const [preview, setPreview] = useState();


  useEffect(() => {
    if (file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      return reader.readAsDataURL(file);
    }
    setPreview();
  }, [file])

  // const reader = new FileReader();
  // reader.readAsDataURL(file);
  // reader.onload = () => {
  //   setPreview(reader.result);
  // }

  return (
    <>
        <img src={preview} alt="preview" className={css} />
    </>
  )
}

export default PreviewImage