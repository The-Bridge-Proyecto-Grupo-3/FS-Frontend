import './App.css';
import { Routes, Route } from 'react-router-dom';
import Principal from './pages/principal/Principal';
import Layout from './layout/layout';
import CompanySection from './pages/sections/company/CompanySection';
import DriverSection from './pages/sections/driver/DriverSection';
import RegisterDriver from './pages/Register/RegisterDriver';
import Provincias from './pages/Gastations/Provincias';
import Municipios from './pages/Gastations/Municipios';
import Gastations from './pages/Gastations/Gastations';
import Gastation from './pages/Gastations/Gastation';
import SearchGS from './pages/Gastations/SearchGS';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />} />
			<Route index element={<Principal />} />
			<Route path="/company" element={<CompanySection />} />
			<Route path="/driver" element={<DriverSection />} />
			<Route path="/registerDriver" element={<RegisterDriver />} />
			<Route path="/provincias" element={<Provincias />} />
			<Route path="/municipios/:id" element={<Municipios />} />
			<Route path="/gastations/:id" element={<Gastations />} />
			<Route path="/gastation/:id" element={<Gastation />} />
			<Route path="/searchGS" element={<SearchGS />} />
		</Routes>
	);
}

export default App;
