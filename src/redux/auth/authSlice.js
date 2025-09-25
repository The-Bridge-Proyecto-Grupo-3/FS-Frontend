import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
	user: null,
	token: null,
	role: null,
	requires2FA: false,
	target: {
		latitude: 0,
		longitude: 0,
	},
};

export const loginUser = createAsyncThunk(
	'auth/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const userData = await authService.userLogin(credentials);
			return { ...userData, location: DataTransfer.location };
		} catch (err) {
			return rejectWithValue(err.response?.data?.message || 'Error de red o del servidor');
		}
	}
);

export const registerDriver = createAsyncThunk('auth/registerDriver', async user => {
	console.log('desde store', user);
});

export const verify2FA = createAsyncThunk(
	'/auth/2fa',
	async (code, { rejectWithValue }) => {
		try {
			const response = await authService.verify2FA(code);
			return response;
		} catch (err) {
			return rejectWithValue('Código 2FA incorrecto o expirado', err);
		}
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.target = action.payload.location; // ????
			state.token = action.payload.token;
			state.requires2FA = action.payload.requires2FA;
			state.role = action.payload.role ?? null;
			state.user = action.payload.user ?? null;
		});
		builder.addCase(verify2FA.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.role = action.payload.role;
			state.requires2FA = false;
		});
	},
});

export default authSlice.reducer;
