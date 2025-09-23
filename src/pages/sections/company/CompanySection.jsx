import './companySection.css';
import AddVehicle from '../../../assets/AddVehicle.png';
import AddDriver from '../../../assets/AddDriver.png';
import LogoutIcon from '../../../assets/LogoutIcon.png';

export default function CompanySection() {
	return (
		<div className="companySectionContainer">
			<div>
				<img src={LogoutIcon} alt="cerrar sesión" width={40} />
			</div>
			<div>
				<h2>Hola Empresa</h2>
			</div>
			<div className="sectionImgContainer">
				<img src={AddVehicle} alt="añadir vehiculos" width={200} />
				<img src={AddDriver} alt="añadir conductores" width={180} />
			</div>
		</div>
	);
}
