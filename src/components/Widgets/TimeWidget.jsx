import React from 'react'
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(frenchStrings)


const TimeWidget = ({ createdAt=new Date(), updatedAt=new Date() }) => {
  const date = createdAt === updatedAt ? createdAt : updatedAt;
  return (
    <>
      <p className='text-xs text-gray-400 truncate'>
        <span className='hidden sm:contents'>{createdAt === updatedAt ? 'Publié ' : 'Modifié '}</span>
        <TimeAgo date={date} formatter={formatter} locale='fr' />
      </p>
    </>
  )
}

TimeWidget.propTypes = {
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
}


export default TimeWidget