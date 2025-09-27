import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import driversService from './driversService';

const initialState = {
	drivers: [],
	emailSent: null,
};

export const getDrivers = createAsyncThunk('drivers/getAll', async (_, { rejectWithValue }) => {
	try {
		return await driversService.getAll();
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error de red o del servidor');
	}
});

export const registerDriver = createAsyncThunk(
	'drivers/register',
	async (companyData, { rejectWithValue }) => {
		try {
			return await driversService.registerDriver(companyData);
		} catch (err) {
			return rejectWithValue(
				err.response?.data?.message || err.error || 'Error de red o del servidor'
			);
		}
	}
);

export const driverSlice = createSlice({
	name: 'drivers',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getDrivers.fulfilled, (state, action) => {
			state.drivers = action.payload;
		});
		builder.addCase(registerDriver.fulfilled, (state, action) => {
			state.emailSent = action.payload.emailSent;
		});
	},
});

export default driverSlice.reducer;
