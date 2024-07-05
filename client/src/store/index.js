import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PURGE,
  PAUSE,
  PERSIST,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // LS store
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { cartReducer } from "../slices/cartSlice";
import { orderReducer } from "../slices/orderSlice";
import { movieReducer } from "../slices/movieSlice";

const persistConfig = {
  key: "mm-cart",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistCart = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistCart,
    movies: movieReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const newStore = persistStore(store);
