import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type AuthState = {
  isLoggedIn: boolean | string;
};

const initialState: AuthState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn') || 'false'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state) {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
    },
    logOut(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
