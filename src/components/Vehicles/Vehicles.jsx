import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicles } from '../../redux/vehicles/vehicleSlice';
import {
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import { Link } from 'react-router-dom';
import './VehicleDetails.css';

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
			<div className="iconContainer">
				<Link to="/company">
					<img src={BackArrowIcon} alt="atras" width={30} />
				</Link>
			</div>
			<h2>Mis Vehículos</h2>

			{vehicles.length > 0 ? (
				<TableContainer sx={{ maxHeight: '550px', padding: '.5rem' }}>
					<Table aria-label="tabla de vehículos" stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell>Marca</TableCell>
								<TableCell>Modelo</TableCell>
								<TableCell>Matrícula</TableCell>
								<TableCell>En Uso</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{vehicles.map(vehicle => (
								<TableRow
									key={vehicle.licence_plate}
									sx={{
										'&:hover': {
											backgroundColor: '#A8A7A7',
										},
									}}
								>
									<TableCell component="td" scope="row">
										{vehicle.brand}
									</TableCell>
									<TableCell>{vehicle.model}</TableCell>
									<TableCell>{vehicle.license_plate}</TableCell>
									<TableCell>
										{vehicle.in_use_by === null ? 'No' : vehicle.in_use_by}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<p>No tienes ningún vehículo registrado.</p>
			)}
		</div>
	);
};
export default Vehicles;
