import { getToken, removeToken } from "./storage";
import moment from "moment";
import { jwtDecode } from "jwt-decode";

export const isValidToken = () => {
  const token = getToken();
  if (!token) return false;
  // token expiry
  const { exp } = jwtDecode(token);
  // proper token check
  const now = moment(new Date().valueOf());
  const expDate = moment.unix(exp);
  if (now > expDate) {
    removeToken();
    removeToken("currentUser");
    return false;
  }
  return true;
};

export const isValidRole = (sysRoles = []) => {
  if (sysRoles.length === 0) return true;
  const token = getToken();
  if (!token) return false;
  const { data: user } = jwtDecode(token);
  return sysRoles.some((role) => user?.roles.includes(role));
};
