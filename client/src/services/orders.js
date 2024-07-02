import { instance } from "../utils/axios";

import { APIs } from "../constants";
import { getToken } from "../utils/storage";

// User Routes
const list = (limit, page, title) => {
  return instance.get(
    `${APIs.ORDERS}?limit=${limit}&page=${page}&title=${title}`
  );
};

const getById = (slug) => {
  return instance.get(`${APIs.ORDERS}/${slug}`);
};

// Admin Routes
const create = (payload) => {
  return instance.post(APIs.ORDERS, payload, {
    headers: {
      access_token: getToken("access_token"),
    },
  });
};

const update = (id, payload) => {
  return instance.put(`${APIs.ORDERS}/${id}`, payload, {
    headers: {
      access_token: getToken("access_token"),
    },
  });
};

const OrderServices = {
  create,
  list,
  getById,
  update,
};

export default OrderServices;
