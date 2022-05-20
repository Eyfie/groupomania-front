import React from 'react'
import PropTypes from 'prop-types';

const TimeWidget = ({createdAt, updatedAt}) => {
  console.log(`${createdAt}`);
  return (
    <>
      <p>L'heure tavu</p>
    </>
  )
}

TimeWidget.propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  updatedAt: PropTypes.instanceOf(Date),
}

export default TimeWidget