import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import receiptService from './receiptService';

const initialState = {
	receipts: [],
	status: 'idle',
	error: null,
};

export const createReceipt = createAsyncThunk(
	'receipts/createReceipt',
	async (receiptData, { rejectWithValue }) => {
		try {
			await receiptService.create(receiptData);
		} catch (error) {
			const message = error.response?.data?.error || 'Error al crear el recibo';
			return rejectWithValue(message);
		}
	}
);

export const fetchReceipts = createAsyncThunk(
	'receipts/fetchReceipts',
	async (companyId, { rejectWithValue }) => {
		try {
			return await receiptService.getAll(companyId);
		} catch (error) {
			const message = error.response?.data?.error || 'Error al cargar los recibos';
			return rejectWithValue(message);
		}
	}
);

const receiptsSlice = createSlice({
	name: 'receipts',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// createReceipt
			.addCase(createReceipt.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(createReceipt.fulfilled, state => {
				state.status = 'succeeded';
			})
			.addCase(createReceipt.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			// fetchReceipts
			.addCase(fetchReceipts.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchReceipts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.receipts = action.payload;
			})
			.addCase(fetchReceipts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export default receiptsSlice.reducer;
