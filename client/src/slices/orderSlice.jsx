import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderServices from "../services/orders";

const initialState = {
  orders: [],
  order: {},
  total: 0,
  limit: 20,
  currentPage: 1,
  error: "",
  loading: false,
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload) => {
    const res = await OrderServices.create(payload);
    return res?.data;
  }
);

export const listOrder = createAsyncThunk(
  "orders/listOrder",
  async ({ page, limit }) => {
    const res = await OrderServices.list(limit, page);
    return res?.data;
  }
);

export const getOrder = createAsyncThunk("orders/getOrder", async (id) => {
  const res = await OrderServices.getById(id);
  return res?.data;
});

export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",
  async ({ id, payload }) => {
    const res = await OrderServices.changeStatus(id, payload);
    return res?.data;
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, payload }) => {
    const res = await OrderServices.update(id, payload);
    return res?.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = Number(action.payload);
    },
    setLimit: (state, action) => {
      state.limit = Number(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(listOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.orders = action.payload.data.orders;
      })
      .addCase(listOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(listOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }, // API Calls
});

export const { setCurrentPage, setLimit } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
