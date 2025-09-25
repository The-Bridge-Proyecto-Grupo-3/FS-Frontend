import { useState, useEffect } from 'react';
import VehicleItem from './VehicleItem';
import api from '../../api/axios';

const Vehicles = () => {
	const [vehicles, setVehicles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchVehicles = async () => {
			try {
				const response = await api.get('/vehicles');
				setVehicles(response.data);
			} catch (error) {
				setError('No se pudieron cargar los vehículos. Inténtalo de nuevo más tarde.');
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchVehicles();
	}, []);

	if (loading) {
		return <p>Cargando vehículos...</p>;
	}

	if (error) {
		return <p className="error-message">{error}</p>;
	}

	return (
		<div className="vehicles-container">
			<h2>Mis Vehículos</h2>
			{vehicles.length > 0 ? (
				<ul className="vehicles-list">
					{vehicles.map(vehicle => (
						<VehicleItem key={vehicle.id} vehicle={vehicle} />
					))}
				</ul>
			) : (
				<p>No tienes ningún vehículo registrado.</p>
			)}
		</div>
	);
};
export default Vehicles;
