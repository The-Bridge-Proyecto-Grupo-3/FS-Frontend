import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
	user: null,
	token: null,
};

export const registerDriver = createAsyncThunk('auth/registerDriver', async user => {
	console.log('desde store', user);
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
});

export default authSlice.reducer;
