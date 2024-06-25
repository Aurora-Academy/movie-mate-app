import { instance } from "../utils/axios";

import { APIs } from "../constants";
import { getToken } from "../utils/storage";

// User Routes
const list = (limit, page, title) => {
  return instance.get(
    `${APIs.MOVIES}?limit=${limit}&page=${page}&title=${title}`
  );
};

const getBySlug = (slug) => {
  return instance.get(`${APIs.MOVIES}/${slug}`);
};

// Admin Routes
const create = (payload) => {
  return instance.post(APIs.MOVIES, payload, {
    headers: {
      access_token: getToken("access_token"),
      "Content-Type": "multipart/form-data",
    },
  });
};

const update = (slug, payload) => {
  return instance.put(`${APIs.MOVIES}/${slug}`, payload, {
    headers: {
      access_token: getToken("access_token"),
      "Content-Type": "multipart/form-data",
    },
  });
};

const patchSeat = () => {};

const patchReleaseDate = () => {};

const removeMovie = () => {};

const MovieServices = {
  create,
  list,
  getBySlug,
  update,
  patchSeat,
  patchReleaseDate,
  removeMovie,
};

export default MovieServices;
