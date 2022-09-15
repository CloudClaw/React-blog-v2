import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USERS_URL } from '../../../constants';
import { RootState } from '../../store';

export type UserItem = {
  id?: string;
  name?: string;
  email?: string;
};

interface ChangeUserProps {
	userId: string;
	user: UserItem;
 }

export interface UserState {
  userData?: UserItem | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  userData: JSON.parse(localStorage.getItem('userData') || '{}'),
  loading: 'idle',
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (nameFromInput: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<UserItem[]>(USERS_URL);
      return data.find(({ name }) => name === nameFromInput);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changeUser = createAsyncThunk(
  'user/changeUser',
  async ({userId, user}:ChangeUserProps, { rejectWithValue }) => {
    try {
      const { data } = await axios.put<UserItem>(USERS_URL + '/' + userId, user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.userData = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = 'failed';
    });

	 builder.addCase(changeUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(changeUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.userData = action.payload;
		localStorage.setItem('userData', JSON.stringify(state.userData))
    });
    builder.addCase(changeUser.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const selectUserData = (state: RootState) => state.userReducer.userData;
export const selectStatus = (state: RootState) => state.userReducer.loading;
export default authSlice.reducer;
