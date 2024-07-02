import { isValidRole, isValidToken } from "../utils/secure";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component, sysRoles = [] }) => {
  return (
    <>
      {isValidToken() && isValidRole(sysRoles) ? (
        component
      ) : isValidToken() && !isValidRole(sysRoles) ? (
        <Navigate replace to="/admin" />
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
