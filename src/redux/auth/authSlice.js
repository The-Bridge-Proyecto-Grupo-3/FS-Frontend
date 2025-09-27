import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
	user: null,
	role: null,
	requires2FA: false,
	target: {
		latitude: 0,
		longitude: 0,
	},
};

export const getUserInfo = createAsyncThunk('auth/info', async (_, { rejectWithValue }) => {
	try {
		console.log('wrfsery');
		const userData = await authService.userInfo();
		return userData;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error de red o del servidor');
	}
});

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

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
	try {
		return await authService.userLogout();
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error de red o del servidor');
	}
});

export const registerDriver = createAsyncThunk('auth/registerDriver', async user => {
	console.log('desde store', user);
});

export const verify2FA = createAsyncThunk('/auth/2fa', async (code, { rejectWithValue }) => {
	try {
		const response = await authService.verify2FA(code);
		return response;
	} catch (err) {
		return rejectWithValue('Código 2FA incorrecto o expirado', err);
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetAuthState: () => initialState,
	},
	extraReducers: builder => {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.target = action.payload.location;
			state.requires2FA = action.payload.requires2FA;
			state.role = action.payload.role ?? null;
			state.user = action.payload.user ?? null;
		});
		builder.addCase(logoutUser.fulfilled, state => {
			state.target = null;
			state.requires2FA = null;
			state.role = null;
			state.user = null;
		});
		builder.addCase(verify2FA.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.role = action.payload.role;
			state.requires2FA = false;
		});
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			state.role = action.payload.role;
			state.user = action.payload.user;
		});
	},
});
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
