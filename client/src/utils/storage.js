import { jwtDecode } from "jwt-decode";

export const setToken = (key = "access_token", value) => {
  const valueType = typeof value;
  const data = valueType === "string" ? value : JSON.stringify(value);
  return localStorage.setItem(key, data);
};

export const getToken = (key = "access_token") => {
  return localStorage.getItem(key);
};

export const removeToken = (key = "access_token") => {
  return localStorage.removeItem(key);
};

export const setCurrentUser = (info) => {
  const token = getToken();
  const { data } = jwtDecode(token);
  data.id = info;
  setToken("currentUser", data);
};
