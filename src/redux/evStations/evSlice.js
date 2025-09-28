import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import evService from './evService';

const initialState = {
	evStations: [],
	isLoading: false,
	isError: false,
	message: '',
};

export const getNearEvStations = createAsyncThunk(
	'ev/getNearEv',
	async ({ latitude, longitude }, thunkAPI) => {
		try {
			return await evService.getNearEvStations(latitude, longitude);
		} catch (error) {
			const message = error.response?.data?.message || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const evSlice = createSlice({
	name: 'ev',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false;
			state.isError = false;
			state.message = '';
			state.evStations = [];
		},
	},
	extraReducers: builder => {
		builder

			.addCase(getNearEvStations.pending, state => {
				state.isLoading = true;
			})

			.addCase(getNearEvStations.fulfilled, (state, action) => {
				state.isLoading = false;
				state.evStations = action.payload;
			})

			.addCase(getNearEvStations.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.evStations = [];
			});
	},
});

export const { reset } = evSlice.actions;
export default evSlice.reducer;
