import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicles } from '../../redux/vehicles/vehicleSlice';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import { Link } from 'react-router-dom';
import './VehicleDetails.css';
import VehicleItem from './VehicleItem';
import IconButton from '../IconButton/IconButton';
import GoBack from '../Buttons/GoBack';

const Vehicles = () => {
	const dispatch = useDispatch();
	const { vehicles, status, error } = useSelector(state => state.vehicles);

	useEffect(() => {
		dispatch(fetchVehicles());
	}, []);

	if (status === 'loading') {
		return <p>Cargando vehículos...</p>;
	}

	if (status === 'failed') {
		return <p className="error-message">{error}</p>;
	}

	return (
		<div className="vehicles-container">
			<GoBack path='/company' />
			<h2>Mis Vehículos</h2>

			{vehicles.length > 0 ? (
				<div className='tableContainer'>
					<table>
						<thead>
							<tr>
								<th>Marca</th>
								<th>Modelo</th>
								<th>Matrícula</th>
								<th>En Uso</th>
							</tr>
						</thead>
						<tbody>
							{vehicles.map(vehicle => <VehicleItem key={vehicle.licence_plate} vehicle={vehicle} />)}
						</tbody>
					</table>
				</div>
			) : (
				<p>No tienes ningún vehículo registrado.</p>
			)}
		</div>
	);
};
export default Vehicles;
