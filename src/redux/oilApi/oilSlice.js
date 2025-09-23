import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import oilService from './oilService';

const initialState = {
	provincias: [],
	municipios: [],
	gastations: [],
	gastationDetails: null,
};

export const getProvincias = createAsyncThunk('oil/getProvincias', async () => {
	try {
		return await oilService.getProvincias();
	} catch (error) {
		console.error(error);
	}
});

export const getMunicipios = createAsyncThunk(
	'oil/getMunicipios',
	async (idProvincia, thunkAPI) => {
		try {
			return await oilService.getMunicipios(idProvincia);
		} catch (error) {
			console.error(error);
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const getGastations = createAsyncThunk(
	'oil/getGastations',
	async (idMunicipio, thunkAPI) => {
		try {
			return await oilService.getGastations(idMunicipio);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const getGastationDetails = createAsyncThunk(
	'oil/getGastationDetails',
	async (idEstacion, thunkAPI) => {
		try {
			return await oilService.getGastationDetails(idEstacion);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const oilSlice = createSlice({
	name: 'oil',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getProvincias.fulfilled, (state, action) => {
				state.provincias = action.payload;
			})
			.addCase(getMunicipios.pending, state => {
				state.municipios = [];
			})
			.addCase(getMunicipios.fulfilled, (state, action) => {
				state.municipios = action.payload;
			})
			.addCase(getMunicipios.rejected, (state, action) => {
				console.error('Error cargando municipios:', action.payload);
			})
			.addCase(getGastations.fulfilled, (state, action) => {
				state.gastations = action.payload;
			})
			.addCase(getGastationDetails.fulfilled, (state, action) => {
				state.gastationDetails = action.payload;
			});
	},
});

export default oilSlice.reducer;
