import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import PropTypes from 'prop-types';
import { ExclamationCircleIcon as ExclamationCircleIconOutline } from '@heroicons/react/outline';
import { ExclamationCircleIcon as ExclamationCircleIconSolid } from '@heroicons/react/solid';
import { useNavigate, useLocation } from 'react-router-dom';

const ReportWidget = ({ setReports, Reports=[], entity, id }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate();

  const handleReport = async () => {
    try {

      const report = Reports.find((report) => report.UserId === auth.id)

      if (report !== undefined) {
        const response = await axiosPrivate.delete(`/report/${report.id}`,
        {
          headers: { 'Content-Type': 'application/json' },
        });
        return setReports(response.data.Reports);
      }

      const entityId = entity === 'post' ? { PostId: id } : { CommentId: id };
      const body = { UserId: auth.id, ...entityId }
  
      const response = await axiosPrivate.post('/report',
      JSON.stringify({...body}),
      {
        headers: { 'Content-Type': 'application/json' },
      });

      setReports(response.data.Reports);
    } catch (error) {
      navigate('/login', { state: { from: location}, replace: true })
    }
  }

  return (
    <div className='text-gray-500 cursor-pointer'>
      { Reports.findIndex((report) => report.UserId === auth.id) !== -1 ? 
        
        <ExclamationCircleIconSolid
          className='h-6 w-6 text-grouporange-900'
          onClick={ () => handleReport() }
         />
        :
        <ExclamationCircleIconOutline 
          onClick={ () => handleReport() }
          className='h-6 w-6 hover:text-slate-900'
        />
      }
    </div>
  )
}

ReportWidget.propTypes = {
  Reports: PropTypes.arrayOf(Object),
  entity: PropTypes.string,
  id: PropTypes.number,
}

export default ReportWidget