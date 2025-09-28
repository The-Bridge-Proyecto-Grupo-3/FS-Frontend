import { configureStore } from '@reduxjs/toolkit';
import auth from '../redux/auth/authSlice';
import vehicles from '../redux/vehicles/vehicleSlice';
import oil from '../redux/oilApi/oilSlice';
import receipts from '../redux/receipts/receiptSlice';
import companies from '../redux/companies/companySlice';
import ev from '../redux/evStations/evSlice';

export const store = configureStore({
	reducer: { auth, oil, vehicles, receipts, companies, ev },
});
