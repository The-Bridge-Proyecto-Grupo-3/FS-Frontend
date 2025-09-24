import { configureStore } from '@reduxjs/toolkit';
import auth from '../redux/auth/authSlice';
import oil from '../redux/oilApi/oilSlice';

export const store = configureStore({
	reducer: { auth, oil },
});
