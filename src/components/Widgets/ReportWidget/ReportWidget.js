import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import PropTypes from 'prop-types';

const ReportWidget = ({Reports, entity, id}) => {

  const { auth } = useAuth()
  const [reports, setReports] = useState([Reports])

  const handleReport = async () => {
    try {
      const report = reports.find((report) => report.UserId === auth.id)
      
      if (report === undefined) {
        const entityId = entity === 'post' ? { PostId: id } : { CommentId: id };
        const body = { UserId: auth.id, ...entityId }
  
        const response = await axios.post('/report',
        JSON.stringify({...body}),
        {
          headers: {
            'Access-Control-Allow-Origin' : 'http://localhost:3000',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ auth.accessToken }`,
          },
          withCredentials: true,
        });
        
        setReports(response.data.Reports);
      }

      const response = await axios.delete(`/report/${report.id}`,
      {
        headers: {
          'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ auth.accessToken }`,
        },
        withCredentials: true,
      });

      setReports(response.data.Reports);

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <FontAwesomeIcon 
        icon={ faCircleExclamation } 
        onClick={ () => handleReport() }
        className={`${reports.findIndex((report) => report.UserId === auth.id) !== -1 ?
         'reported'
        : null }` }
        />
    </div>
  )
}

ReportWidget.propTypes = {
  Reports: PropTypes.arrayOf(Object),
  entity: PropTypes.string,
  id: PropTypes.number,
}

export default ReportWidget