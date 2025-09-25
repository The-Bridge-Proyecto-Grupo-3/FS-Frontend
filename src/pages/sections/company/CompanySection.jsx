import './companySection.css';
import AddVehicle from '../../../assets/AddVehicle.png';
import AddDriver from '../../../assets/AddDriver.png';
import LogoutIcon from '../../../assets/LogoutIcon.png';
import { useSelector } from 'react-redux';

export default function CompanySection() {
	const { user } = useSelector(state => state.auth);
	return (
		<div className="companySectionContainer">
			<div>
				<img src={LogoutIcon} alt="cerrar sesión" width={40} />
			</div>
			<div>
				<h2>Hola {user.name}</h2>
			</div>
			<div className="sectionImgContainer">
				<img src={AddVehicle} alt="añadir vehiculos" width={200} />
				<img src={AddDriver} alt="añadir conductores" width={180} />
			</div>
		</div>
	);
}
