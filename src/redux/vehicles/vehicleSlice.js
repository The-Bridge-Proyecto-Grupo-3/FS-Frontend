import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vehicleService from './vehicleService';

const initialState = {
	vehicles: [],
	selectedVehicle: null,
	status: 'idle',
	error: null,
};

export const createVehicle = createAsyncThunk(
	'vehicles/createVehicle',
	async (vehicleData, { rejectWithValue }) => {
		try {
			return await vehicleService.create(vehicleData);
		} catch (error) {
			return rejectWithValue(error.response?.data?.error || 'Error al crear el vehículo');
		}
	}
);

export const fetchVehicles = createAsyncThunk(
	'vehicles/fetchVehicles',
	async (_, { rejectWithValue }) => {
		try {
			return await vehicleService.getAll();
		} catch (error) {
			const message = error.response?.data?.error || 'Error al cargar los vehículos';
			return rejectWithValue(message);
		}
	}
);

export const fetchVehicleById = createAsyncThunk(
	'vehicles/fetchVehicleById',
	async (id, { rejectWithValue }) => {
		try {
			return await vehicleService.getById(id);
		} catch (error) {
			const message = error.response?.data?.error || 'Error al cargar el vehículo';
			return rejectWithValue(message);
		}
	}
);

export const updateVehicle = createAsyncThunk(
	'vehicles/updateVehicle',
	async (vehicleData, { rejectWithValue }) => {
		try {
			const { id, ...fields } = vehicleData;
			return await vehicleService.update(id, fields);
		} catch (error) {
			const message = error.response?.data?.error || 'Error al actualizar el vehículo';
			return rejectWithValue(message);
		}
	}
);

export const deleteVehicle = createAsyncThunk(
	'vehicles/deleteVehicle',
	async (id, { rejectWithValue }) => {
		try {
			await vehicleService.remove(id);
			return id; // En caso de éxito, se devuelve el ID
		} catch (error) {
			const message = error.response?.data?.error || 'Error al eliminar el vehículo';
			return rejectWithValue(message);
		}
	}
);

const vehiclesSlice = createSlice({
	name: 'vehicles',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// createVehicle
			.addCase(createVehicle.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(createVehicle.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.vehicles.push(action.payload);
			})
			.addCase(createVehicle.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
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
