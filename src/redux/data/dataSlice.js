import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dataService from './dataService';

const initialState = {
	dataStations: [],
	tip: null,
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
	async (data, { rejectWithValue }) => {
		try {
			return await dataService.postHabits(data);
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
			state.dataStations = action.payload.estaciones.slice(0,5);
			state.status = 'success'
		});
		builder.addCase(postRecommendations.pending, (state, action) => {
			state.dataStations = action.payload;
			state.status = 'loading'
		});
		builder.addCase(postRecommendations.rejected, (state, action) => {
			state.dataStations = null;
			state.status = 'error'
		});
		builder.addCase(postHabits.fulfilled, (state, action) => {
			if(state.tip === null) {
				// state.tip = action.payload.consejos;
				state.tip = 'Cambio de aceite, filtro de aceite y neumáticos de flota';
			}
		});
	},
});

export default dataSlice.reducer;
