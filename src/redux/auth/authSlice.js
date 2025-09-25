import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
	user: null,
	token: null,
	target: {
		latitude: 0,
		longitude: 0,
	},
	requires2FA: false,
	is2FACompleted: false,
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
	'/auth/2fa/enable',
	async ({ code, email }, { rejectWithValue }) => {
		try {
			const response = await authService.verify2FA({ code, email });
			return response; // debería incluir token si to_do está correcto
		} catch (err) {
			return rejectWithValue('Código 2FA incorrecto o expirado', err);
		}
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: builder => {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.target = action.payload.location;
			if (action.payload.requires2FA) {
				state.requires2FA = true;
				state.is2FACompleted = false;
				state.token = null;
			} else {
				state.token = action.payload.token;
				state.requires2FA = false;
				state.is2FACompleted = true;
			}
		});
		builder.addCase(verify2FA.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.requires2FA = false;
			state.is2FACompleted = true;
		});
	},
});

export default authSlice.reducer;
