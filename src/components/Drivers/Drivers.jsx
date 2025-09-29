import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/drivers/driverSlice';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import { Link } from 'react-router-dom';
import GoBack from '../GoBack/GoBack';

const Vehicles = () => {
	const dispatch = useDispatch();
	const { drivers, status, error } = useSelector(state => state.drivers);

	useEffect(() => {
		dispatch(getDrivers());
	}, []);

	if (status === 'loading') {
		return <p>Cargando conductores...</p>;
	}

	if (status === 'failed') {
		return <p className="error-message">{error}</p>;
	}

	return (
		<div className="vehicles-container">
			<GoBack path='/company' />
			<h2>Mis conductores</h2>
			{status === 'loading' && <p>Cargando conductores...</p>}
			{status === 'failed' && <p className="error-message">{error}</p>}

			{drivers?.length > 0 ? (
				<div className='tableContainer'>
					<table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Apellido</th>
							</tr>
						</thead>
						<tbody>
							{drivers.map(driver => (
								<tr key={driver.licence_plate} >
									<td component="th" scope="row">
										{driver.first_name}
									</td>
									<td>{driver.last_name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p>No tienes ningún conductor registrado.</p>
			)}
		</div>
	);
};
export default Vehicles;
