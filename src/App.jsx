import './App.css';
import { Routes, Route } from 'react-router-dom';
import Principal from './pages/principal/Principal';
import Layout from './layout/layout';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />} />
			<Route index element={<Principal />} />
		</Routes>
	);
}

export default App;
