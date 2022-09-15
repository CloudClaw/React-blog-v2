import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { POSTS_URL } from '../../../constants';
import { RootState } from '../../store';

export type PostType = {
  id: string;
  title: string;
  description: string;
  liked: boolean;
  tag?: string;
};

interface PostsState {
  posts: PostType[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

interface ChangeFetchProps {
	id: string;
	editedPost: PostType;
 }

const initialState: PostsState = {
  posts: [],
  loading: 'idle',
};

export const fetchPosts = createAsyncThunk<PostType[]>(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<PostType[]>(POSTS_URL);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deletePosts = createAsyncThunk(
  'posts/deletePosts',
  async (postId: string, { rejectWithValue }) => {
    try {
      await axios.delete(POSTS_URL + postId);
      return postId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changePosts = createAsyncThunk(
  'posts/changePosts',
  async ({ id, editedPost }: ChangeFetchProps, { rejectWithValue }) => {
    try {
      const { data } = await axios.put<PostType>(POSTS_URL + id, editedPost);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addPosts = createAsyncThunk(
	'posts/addPosts',
	async (postToAdd: PostType, { rejectWithValue }) => {
	  try {
		const {data} = await axios.post(POSTS_URL, postToAdd);
		 return data;
	  } catch (error) {
		 return rejectWithValue(error);
	  }
	},
 );

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(deletePosts.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deletePosts.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
    builder.addCase(deletePosts.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(changePosts.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(changePosts.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.posts = [...state.posts].map((post) => {
			if(post.id === action.payload.id) return action.payload
			return post
		})
    });
    builder.addCase(changePosts.rejected, (state) => {
      state.loading = 'failed';
    });

	 builder.addCase(addPosts.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(addPosts.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.posts.push(action.payload)
    });
    builder.addCase(addPosts.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const selectPosts = (state: RootState) => state.postsReducer.posts;
export default postsSlice.reducer;
