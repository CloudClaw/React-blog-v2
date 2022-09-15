import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/Auth/authSlice';
import userReducer from './Slices/User/userSlice';
import postsReducer from './Slices/Content/contentSlice';
import singlePostReducer from './Slices/SinglePost/singlePostSlice';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
   authReducer,
	userReducer,
	postsReducer,
	singlePostReducer
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>
