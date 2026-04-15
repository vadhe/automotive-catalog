import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import catalogReducer from "@/store/catalogSlice";
import wishlistReducer from "@/store/wishlistSlice";

const catalogPersistConfig = {
  key: "catalog",
  storage,
  blacklist: ["visibleCount"],
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const rootReducer = combineReducers({
  catalog: persistReducer(catalogPersistConfig, catalogReducer),
  wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
});

export function makeStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
}

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
