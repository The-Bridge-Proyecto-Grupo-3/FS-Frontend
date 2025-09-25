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

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />} />
			<Route index element={<Principal />} />
			<Route path="/company" element={<CompanySection />} />
			<Route path="/driver" element={<DriverSection />} />
			<Route path="/admin" element={<AdminSection />} />
			<Route path="/registerDriver" element={<RegisterDriver />} />
			<Route path="/searchGS" element={<SearchGS />} />
			<Route path="/register" element={<RegisterCompany />} />
			<Route path="/registerVehicle" element={<RegisterVehicle />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
