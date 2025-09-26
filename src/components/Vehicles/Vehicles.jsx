import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicles } from '../../redux/vehicles/vehicleSlice';
import VehicleItem from './VehicleItem';
import './Vehicles.css';

const Vehicles = () => {
	const dispatch = useDispatch();
	const { vehicles, status, error } = useSelector(state => state.vehicles);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchVehicles());
		}
	}, [status, dispatch]);

	if (status === 'loading') {
		return <p>Cargando vehículos...</p>;
	}

	if (status === 'failed') {
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
