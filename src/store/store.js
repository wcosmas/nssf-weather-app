import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import appSlice from './AppSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'nssf',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  app: appSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);
