import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import oilService from './oilService';

const initialState = {
	provincias: [],
	municipios: [],
	gastations: [],
	gastationDetails: null,
	isLoading: false,
	isError: false,
	message: '',
};

export const getProvincias = createAsyncThunk('oil/getProvincias', async thunkAPI => {
	try {
		return await oilService.getProvincias();
	} catch (error) {
		const message = error.response?.data?.message || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const getMunicipios = createAsyncThunk(
	'oil/getMunicipios',
	async (idProvincia, thunkAPI) => {
		try {
			return await oilService.getMunicipios(idProvincia);
		} catch (error) {
			console.error(error);
			const message = error.response?.data?.message || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getGastations = createAsyncThunk(
	'oil/getGastations',
	async (idMunicipio, thunkAPI) => {
		try {
			return await oilService.getGastations(idMunicipio);
		} catch (error) {
			const message = error.response?.data?.message || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getGastationDetails = createAsyncThunk(
	'oil/getGastationDetails',
	async (idEstacion, thunkAPI) => {
		try {
			return await oilService.getGastationDetails(idEstacion);
		} catch (error) {
			const message = error.response?.data?.message || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const oilSlice = createSlice({
	name: 'oil',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false;
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getProvincias.pending, state => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getProvincias.fulfilled, (state, action) => {
				state.isLoading = false;
				state.provincias = action.payload;
			})
			.addCase(getProvincias.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getMunicipios.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.municipios = [];
			})
			.addCase(getMunicipios.fulfilled, (state, action) => {
				state.isLoading = false;
				state.municipios = action.payload;
			})
			.addCase(getMunicipios.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.municipios = [];
			})
			.addCase(getGastations.pending, state => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getGastations.fulfilled, (state, action) => {
				state.isLoading = false;
				state.gastations = action.payload;
			})
			.addCase(getGastations.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getGastationDetails.pending, state => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getGastationDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.gastationDetails = action.payload;
			})
			.addCase(getGastationDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = oilSlice.actions;
export default oilSlice.reducer;
