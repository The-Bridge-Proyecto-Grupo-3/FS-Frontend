import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import companyService from './companyService';

const initialState = {
	companies: [],
	emailSent: null
};

export const getCompanies = createAsyncThunk('companies/getAll', async (_, { rejectWithValue }) => {
	try {
		return await companyService.getAll();
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error de red o del servidor');
	}
});

export const registerCompany = createAsyncThunk(
	'companies/register',
	async (companyData, { rejectWithValue }) => {
		try {
			return await companyService.registerCompany(companyData);
		} catch (err) {
			return rejectWithValue(err.response?.data?.message || err.error || 'Error de red o del servidor');
		}
	}
);

export const companySlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getCompanies.fulfilled, (state, action) => {
			state.companies = action.payload;
		});
		builder.addCase(registerCompany.fulfilled, (state, action) => {
			state.emailSent = action.payload.emailSent;
		});
	},
});

export default companySlice.reducer;
