import './App.css';
import { Routes, Route } from 'react-router-dom';
import Principal from './pages/principal/Principal';
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

function App() {
	return (
		// llamar a /users/me para poder usar las rutas protegidas cuando se recargue la pag
		<Routes>
			<Route path="/" element={<Layout />} />
			<Route index element={<Principal />} />
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
			<Route path="/NearbyGS" element={<NearbyGastations />} />
		</Routes>
	);
}

export default App;
