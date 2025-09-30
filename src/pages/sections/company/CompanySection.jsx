import './companySection.css';
import AddVehicle from '../../../assets/AddVehicle.png';
import AddDriver from '../../../assets/AddDriver.png';
import CarList from '../../../assets/CarList.png';
import DriverList from '../../../assets/DriverList.png';
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
			<div className="imgApis">
				<Link to="/vehicles" className="linkStyle">
					<div className="nameToIcons">
						<label htmlFor="carList">Lista de Vehículos</label>
						<img src={CarList} alt="Lista de Vehículos" width={140} />
					</div>
				</Link>
				{/* cambiar ruta cuando se cree el componente */}
				<Link to="/driversList" className="linkStyle">
					<div className="nameToIcons">
						<label htmlFor="driverList">Lista de Conductores</label>
						<img src={DriverList} alt="Lista de Conductores" width={110} />
					</div>
				</Link>
			</div>
			<TipsPopup />
		</div>
	);
}
