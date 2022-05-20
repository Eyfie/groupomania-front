import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import PropTypes from 'prop-types';
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  
  useEffect(()=> {
    const ping = async () => {
      try {
        const response = await axiosPrivate.get('user/me');
        setAuth(response.data.User);
      } catch (error) {
        console.log(error)
      }
    }
    ping()
  }, [axiosPrivate, setAuth])

  console.log(auth);
  return (
    allowedRoles.includes(auth?.role)
      ? <Outlet /> 
      : auth?.username
        ? <Navigate to='/unauthorized' state={{ from: location}} replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  );
}

RequireAuth.propTypes = {
  allowedRoles: PropTypes.arrayOf(String)
}

export default RequireAuth;