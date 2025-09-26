import './driverSection.css';
import Autocomplete from '@mui/material/Autocomplete';
import LogoutIcon from '../../../assets/LogoutIcon.png';
import { TextField } from '@mui/material';
import FindGass from '../../../assets/FindGass.png';
import TicketIcon from '../../../assets/TicketIcon.png';
import FindElecDot from '../../../assets/FindElecDot.png';
import { useSelector } from 'react-redux';

export default function DriverSection() {
	const { user } = useSelector(state => state.auth);

	return (
		<div>
			<div className="logoContainer">
				<img src={LogoutIcon} alt="cerrar sesión" width={40} />
			</div>
			<div className="infoContainer">
				<h2>
					Hola {user.first_name} {user.last_name}
				</h2>

				<Autocomplete
					disablePortal
					options={[]}
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
					<div className="nameToIcons">
						<label htmlFor="gasolineras">Gasolineras</label>
						<img src={FindGass} alt="añadir vehículos" width={140} />
					</div>
					<div className="nameToIcons">
						<label htmlFor="puntosRecarga">Puntos de Recarga</label>
						<img src={FindElecDot} alt="añadir conductores" width={140} />
					</div>
				</div>
				<div className="imgTicket">
					<label htmlFor="tickets">Registra Tickets</label>
					<img src={TicketIcon} alt="añadir ticket" width={140} />
				</div>
			</div>
		</div>
	);
}
