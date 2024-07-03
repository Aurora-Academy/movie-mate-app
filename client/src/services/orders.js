import { instance } from "../utils/axios";

import { APIs } from "../constants";
import { getToken } from "../utils/storage";

const list = (limit, page) => {
  const isAdmin =
    JSON.parse(localStorage.getItem("currentUser"))?.roles.includes("admin") ||
    false;
  return instance.get(
    `${APIs.ORDERS}?limit=${limit}&page=${page}&showAll=${isAdmin}`,
    {
      headers: {
        access_token: getToken("access_token"),
      },
    }
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

const changeStatus = (id, payload) => {
  return instance.put(`${APIs.ORDERS}/${id}/status`, payload, {
    headers: {
      access_token: getToken("access_token"),
    },
  });
};

const OrderServices = {
  changeStatus,
  create,
  list,
  getById,
  update,
};

export default OrderServices;
