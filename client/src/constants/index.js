export const BASE_URL = import.meta.env.VITE_API_URL; // http://localhost:3000

export const API_URL = BASE_URL + "/api/v1"; // http://localhost:3000/api/v1

export const APIs = {
  MOVIES: API_URL + "/movies",
  USERS: API_URL + "/users",
};
