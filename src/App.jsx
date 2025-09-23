import './App.css';
import { Routes, Route } from 'react-router-dom';
import Principal from './pages/principal/Principal';
import Layout from './layout/layout';
import CompanySection from './pages/sections/company/CompanySection';
import DriverSection from './pages/sections/driver/DriverSection';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />} />
			<Route index element={<Principal />} />
			<Route path="/company" element={<CompanySection />} />
			<Route path="/driver" element={<DriverSection />} />
		</Routes>
	);
}

export default App;
