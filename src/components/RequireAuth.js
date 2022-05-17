import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    // auth?.role?.find(role => allowedRoles.includes(role))
    allowedRoles.includes(auth?.role)
      ? <Outlet /> 
      : auth?.username
        ? <Navigate to='unauthorized' state={{ from: location}} replace />
        : <Navigate to='auth/login' state={{ from: location }} replace />
  );
}

export default RequireAuth;