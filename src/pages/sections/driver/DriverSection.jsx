import './driverSection.css';
import Autocomplete from '@mui/material/Autocomplete';
import LogoutIcon from '../../../assets/LogoutIcon.png';
import { TextField } from '@mui/material';
import FindGass from '../../../assets/FindGass.png';
import FindElecDot from '../../../assets/FindElecDot.png';
export default function DriverSection() {
	return (
		<div className="driverSectionContainer">
			<div>
				<img src={LogoutIcon} alt="cerrar sesión" width={40} />
			</div>
			<div>
				<h2>Hola Conductor</h2>
			</div>
			<div>
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
			<div className="sectionImgContainer">
				<img src={FindGass} alt="añadir vehículos" width={140} />
				<img src={FindElecDot} alt="añadir conductores" width={140} />
			</div>
		</div>
	);
}
