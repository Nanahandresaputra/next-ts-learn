import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postReducer from "./siderSlice/index";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { config } from "@/config/config";

const rootReducer = combineReducers({
  post: postReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    transforms: [
      encryptTransform({
        secretKey: config.secretKey,
      }) as any,
    ],
    storage,
  } as any,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistStored = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
