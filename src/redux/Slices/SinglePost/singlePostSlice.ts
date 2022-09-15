import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { POSTS_URL } from '../../../constants';
import { RootState } from '../../store';
import { PostType } from '../Content/contentSlice';


interface PostsState {
  singlePost: PostType | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: PostsState = {
  singlePost: null,
  loading: 'idle',
};

type FetchSinglePostProps = Record<string, string>;

export const fetchSinglePosts = createAsyncThunk<PostType, FetchSinglePostProps>(
  'posts/fetchPosts',
  async ({postId}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<PostType>(POSTS_URL + postId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const singlePostsSlice = createSlice({
  name: 'singlePosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSinglePosts.pending, (state) => {
      state.loading = 'pending';
    })
      builder.addCase(fetchSinglePosts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.singlePost = action.payload;
      })
      builder.addCase(fetchSinglePosts.rejected, (state) => {
        state.loading = 'failed';
      })
  }
});

export const selectSinglePost = (state: RootState) => state.singlePostReducer.singlePost;
export const selectLoading = (state:RootState) => state.singlePostReducer.loading
export default singlePostsSlice.reducer;
