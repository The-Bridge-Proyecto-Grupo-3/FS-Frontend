import './driverSection.css';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import FindGass from '../../../assets/FindGass.png';
import TicketIcon from '../../../assets/TicketIcon.png';
import FindElecDot from '../../../assets/FindElecDot.png';
import RouteMap from '../../../assets/RouteMap.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../../../components/Buttons/LogoutButton';
import { useEffect, useMemo } from 'react';
import { fetchVehicles } from '../../../redux/vehicles/vehicleSlice';

export default function DriverSection() {
	const { user } = useSelector(state => state.auth);
	const { vehicles } = useSelector(state => state.vehicles);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchVehicles(true));
	}, [user]);

	const vehicleToOption = vehicle =>
		vehicle
			? {
					id: vehicle.id,
					label: `${vehicle.brand} ${vehicle.model} - ${vehicle.license_plate}`,
			  }
			: {};

	const vehicleOptions = useMemo(
		() => [...[vehicleToOption(user.Vehicle)], ...vehicles.map(vehicleToOption)],
		[vehicles, user]
	);
	const selectedVehicle = useMemo(() => vehicleToOption(user.Vehicle), [user]);

	return (
		<div>
			<LogoutButton />
			<div className="infoContainer">
				<h2>
					Hola {user.first_name} {user.last_name}
				</h2>

				<Autocomplete
					disablePortal
					options={vehicleOptions}
					value={selectedVehicle}
					sx={{ width: '359px' }}
					renderInput={params => (
						<TextField
							{...params}
							label="Vehículos"
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: '24px',
									height: '50px',
								},
							}}
						/>
					)}
				/>
			</div>
			<div className="imagesContainer">
				<div className="imgApis">
					<Link to="/searchGS" className="linkStyle">
						<div className="nameToIcons">
							<label htmlFor="gasolineras">Gasolineras</label>
							<img src={FindGass} alt="Gasolineras" width={140} />
						</div>
					</Link>
					{/* cambiar ruta cuando se cree el componente */}
					<Link to="/searchEV" className="linkStyle">
						<div className="nameToIcons">
							<label htmlFor="puntosRecarga">Puntos de Recarga</label>
							<img src={FindElecDot} alt="Puntos de Recarga" width={140} />
						</div>
					</Link>
				</div>
				<div className="imgApis">
					<Link to="/searchRoute" className="linkStyle">
						<div className="nameToIcons">
							<label htmlFor="rutaMapa">Buscar en Ruta</label>
							<img src={RouteMap} alt="Buscar en Ruta" width={140} />
						</div>
					</Link>
					<Link to="/registerReceipt" className="linkStyle">
						<div className="imgTicket">
							<label htmlFor="tickets">Registra Tickets</label>
							<img src={TicketIcon} alt="añadir ticket" width={140} />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
