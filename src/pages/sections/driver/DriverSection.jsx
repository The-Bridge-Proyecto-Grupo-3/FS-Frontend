import './driverSection.css';
import Autocomplete from '@mui/material/Autocomplete';
import LogoutIcon from '../../../assets/LogoutIcon.png';
import { TextField } from '@mui/material';
import FindGass from '../../../assets/FindGass.png';
import TicketIcon from '../../../assets/TicketIcon.png';
import FindElecDot from '../../../assets/FindElecDot.png';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/auth/authSlice';
import { Link } from 'react-router-dom';

export default function DriverSection() {
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return (
		<div>
			<div className="logoContainer" onClick={handleLogout}>
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
					<Link to="/searchGS" className="linkStyle">
						<div className="nameToIcons">
							<label htmlFor="gasolineras">Gasolineras</label>
							<img src={FindGass} alt="añadir vehículos" width={140} />
						</div>
					</Link>
					{/* cambiar ruta cuando se cree el componente */}
					<Link to="/searchGS" className="linkStyle">
						<div className="nameToIcons">
							<label htmlFor="puntosRecarga">Puntos de Recarga</label>
							<img src={FindElecDot} alt="añadir conductores" width={140} />
						</div>
					</Link>
				</div>
				<Link to="/registerReceipt" className="linkStyle">
					<div className="imgTicket">
						<label htmlFor="tickets">Registra Tickets</label>
						<img src={TicketIcon} alt="añadir ticket" width={140} />
					</div>
				</Link>
			</div>
		</div>
	);
}
