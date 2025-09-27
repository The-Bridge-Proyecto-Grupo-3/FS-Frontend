import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './layout/layout';
import CompanySection from './pages/sections/company/CompanySection';
import DriverSection from './pages/sections/driver/DriverSection';
import AdminSection from './pages/sections/admin/AdminSection';
import RegisterDriver from './pages/Register/RegisterDriver';
import SearchGS from './pages/Gastations/SearchGS';
import RegisterCompany from './pages/Register/RegisterCompany';
import RegisterVehicle from './pages/Register/RegisterVehicle';
import Login from './pages/login/login.jsx';
import VehicleDetails from './components/Vehicles/VehicleDetails';
import NearbyGastations from './pages/Gastations/NearbyGastations.jsx';
import ProtectedRoute from './guards/ProtectedRoute.jsx';
import RegisterReceipt from './pages/Register/RegisterReceipt.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './redux/auth/authSlice.js';
import SearchEV from './pages/EvStations/SearchEv.jsx';

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { role } = useSelector(state => state.auth);

	// 1. Traemos la info del usuario al montar
	useEffect(() => {
		dispatch(getUserInfo());
	}, [dispatch]);

	// 2. Redirigir si estamos en "/" y tenemos un rol
	useEffect(() => {
		if (window.location.pathname === '/' && role) {
			switch (role) {
				case 'admin':
					navigate('/admin', { replace: true });
					break;
				case 'company':
					navigate('/company', { replace: true });
					break;
				case 'driver':
					navigate('/driver', { replace: true });
					break;
				default:
					navigate('/login', { replace: true });
			}
		}
	}, [role, navigate]);

	return (
		<Routes>
			<Route path="/" element={<Layout />} />
			<Route
				path="/admin"
				element={
					<ProtectedRoute role="admin">
						<AdminSection />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/company"
				element={
					<ProtectedRoute role="company">
						<CompanySection />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/driver"
				element={
					<ProtectedRoute role="driver">
						<DriverSection />
					</ProtectedRoute>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route
				path="/register"
				element={
					<ProtectedRoute>
						<RegisterCompany />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/registerDriver"
				element={
					<ProtectedRoute role="company">
						<RegisterDriver />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/registerVehicle"
				element={
					<ProtectedRoute role="company">
						<RegisterVehicle />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/registerReceipt"
				element={
					<ProtectedRoute role="driver">
						<RegisterReceipt />
					</ProtectedRoute>
				}
			/>
			<Route path="/vehicles/:id" element={<VehicleDetails />} />
			<Route path="/searchGS" element={<SearchGS />} />
			<Route path="/searchEV" element={<SearchEV />} />
			<Route path="/NearbyGS" element={<NearbyGastations />} />
		</Routes>
	);
}

export default App;
