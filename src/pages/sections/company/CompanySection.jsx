import './companySection.css';
import AddVehicle from '../../../assets/AddVehicle.png';
import AddDriver from '../../../assets/AddDriver.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../../../components/Buttons/LogoutButton';
import TipsPopup from '../../../components/TipsPopup/TipsPopup';

export default function CompanySection() {
	const { user } = useSelector(state => state.auth);
	return (
		<div className="companySectionContainer">
			<LogoutButton />
			<div>
				<h2>Hola {user.name}</h2>
			</div>
			<div className="sectionImgContainer">
				<Link to="/registerVehicle">
					<img src={AddVehicle} alt="añadir vehiculos" width={200} />
				</Link>
				<Link to="/registerDriver">
					<img src={AddDriver} alt="añadir conductores" width={180} />
				</Link>
			</div>
			<div className="LinkContainer">
				<Link to="/vehicles" className="vehiclesLink">
					Lista de Vehículos
				</Link>
				<Link to="/driversList" className="vehiclesLink">
					Lista de Conductores
				</Link>
			</div>
			<TipsPopup />
		</div>
	);
}
