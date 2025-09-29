import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dataService from './dataService';

const initialState = {
	dataStations: [],
	tips: [],
	status: 'idle'
};

export const postRecommendations = createAsyncThunk(
	'data/recomendaciones',
	async (routeData, { rejectWithValue }) => {
		try {
			return await dataService.postRecommendations(routeData);
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.error || error.error || 'Error de red o del servidor'
			);
		}
	}
);

export const postHabits = createAsyncThunk(
	'data/predict',
	async (driverData, { rejectWithValue }) => {
		try {
			return await driversService.registerDriver(driverData);
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.error || error.error || 'Error de red o del servidor'
			);
		}
	}
);

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(postRecommendations.fulfilled, (state, action) => {
			state.dataStations = action.payload.estaciones.slice(5);
			state.status = 'success'
		});
		builder.addCase(postRecommendations.pending, (state, action) => {
			state.dataStations = action.payload;
			state.status = 'loading'
		});
		builder.addCase(postHabits.fulfilled, (state, action) => {
			state.tips = action.payload;
		});
	},
});

export default dataSlice.reducer;
