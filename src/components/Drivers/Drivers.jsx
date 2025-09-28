import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicles } from '../../redux/vehicles/vehicleSlice';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import { Link } from 'react-router-dom';

const Vehicles = () => {
	const dispatch = useDispatch();
	const { vehicles, status, error } = useSelector(state => state.vehicles);

	useEffect(() => {
		console.log('Aqui');
		if (status === 'idle') {
			dispatch(fetchVehicles());
		}
	}, [status, dispatch]);

	if (status === 'loading') {
		return <p>Cargando Conductores...</p>;
	}

	if (status === 'failed') {
		return <p className="error-message">{error}</p>;
	}

	return (
		<div className="vehicles-container">
			<div className="iconContainer">
				<Link to="/company">
					<img src={BackArrowIcon} alt="atras" width={30} />
				</Link>
			</div>
			<h2>Mis conductores</h2>

			{vehicles.length > 0 ? (
				<div className='tableContainer'>
					<table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Apellido</th>
							</tr>
						</thead>
						<tbody>
							{vehicles.map(vehicle => (
								<tr key={vehicle.licence_plate} >
									<td component="th" scope="row">
										{vehicle.brand}
									</td>
									<td>{vehicle.model}</td>
								</tr>
							))}
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
