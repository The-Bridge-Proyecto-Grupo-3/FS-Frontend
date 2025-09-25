import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
	vehicles: [],
	selectedVehicle: null,
	status: 'idle',
	error: null,
};

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
	const response = await api.get('/vehicles');
	return response.data;
});

export const fetchVehicleById = createAsyncThunk('vehicles/fetchVehicleById', async id => {
	const response = await api.get(`/vehicles/${id}`);
	return response.data;
});

export const updateVehicle = createAsyncThunk('vehicles/updateVehicle', async vehicleData => {
	const { id, ...fields } = vehicleData;
	const response = await api.put(`/vehicles/${id}`, fields);
	return response.data;
});

export const deleteVehicle = createAsyncThunk('vehicles/deleteVehicle', async id => {
	await api.delete(`/vehicles/${id}`);
	return id; // Devuelve el ID para poder eliminarlo del estado
});

const vehiclesSlice = createSlice({
	name: 'vehicles',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// fetchVehicles
			.addCase(fetchVehicles.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchVehicles.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.vehicles = action.payload;
			})
			.addCase(fetchVehicles.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			// fetchVehicleById
			.addCase(fetchVehicleById.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchVehicleById.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.selectedVehicle = action.payload;
			})
			// updateVehicle
			.addCase(updateVehicle.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.selectedVehicle = action.payload;

				const index = state.vehicles.findIndex(v => v.id === action.payload.id);
				if (index !== -1) {
					state.vehicles[index] = action.payload;
				}
			})
			// deleteVehicle
			.addCase(deleteVehicle.fulfilled, (state, action) => {
				state.status = 'succeeded';

				state.vehicles = state.vehicles.filter(v => v.id !== action.payload);
				state.selectedVehicle = null;
			});
	},
});

export default vehiclesSlice.reducer;
