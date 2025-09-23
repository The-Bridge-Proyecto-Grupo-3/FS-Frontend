import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegisterDriver from './pages/Register/RegisterDriver';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/registerDriver" element={<RegisterDriver />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
