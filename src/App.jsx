import './styles/main.scss';
import { Routes, Route } from 'react-router-dom';
import RedirectHome from './redirect/RedirectHome.jsx';
import CompanySection from './pages/sections/company/CompanySection';
import DriverSection from './pages/sections/driver/DriverSection';
import AdminSection from './pages/sections/admin/AdminSection';
import RegisterDriver from './pages/Register/RegisterDriver';
import SearchGS from './pages/Gastations/SearchGS';
import RegisterCompany from './pages/Register/RegisterCompany';
import RegisterVehicle from './pages/Register/RegisterVehicle';
import Login from './pages/login/login.jsx';
import Vehicles from './components/Vehicles/Vehicles.jsx';
import VehicleDetails from './components/Vehicles/VehicleDetails.jsx';
import ProtectedRoute from './guards/ProtectedRoute.jsx';
import RegisterReceipt from './pages/Register/RegisterReceipt.jsx';
import Drivers from './components/Drivers/Drivers.jsx';
import SearchEV from './pages/EvStations/SearchEv.jsx';

function App() {
	return (
		<Routes>
			<Route element={<ProtectedRoute role='admin' />}>
				<Route path="/admin" element={<AdminSection />}/>
			</Route>
			<Route element={<ProtectedRoute role='company' />}>
				<Route path="/company" element={<CompanySection />}/>
				<Route path="/vehicles" element={<Vehicles />} />
				<Route path="/vehicles/:id" element={<VehicleDetails />} />
				<Route path="/driversList" element={<Drivers />} />
				<Route path="/registerDriver" element={<RegisterDriver />} />
				<Route path="/registerVehicle" element={<RegisterVehicle />} />
			</Route>
			<Route element={<ProtectedRoute role='driver' />}>
				<Route path="/driver" element={<DriverSection />}/>
				<Route path="/registerReceipt" element={<RegisterReceipt />} />			
			</Route>
			<Route element={<ProtectedRoute />}>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<RegisterCompany />} />
			</Route>
			<Route path="/" element={<RedirectHome />} />
			
			<Route path="/searchGS" element={<SearchGS />} />
			<Route path="/searchEV" element={<SearchEV />} />
		</Routes>
	);
}

export default App;
