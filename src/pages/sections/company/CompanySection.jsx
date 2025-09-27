import './companySection.css';
import AddVehicle from '../../../assets/AddVehicle.png';
import AddDriver from '../../../assets/AddDriver.png';
import LogoutIcon from '../../../assets/LogoutIcon.png';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/auth/authSlice';
import { Link } from 'react-router-dom';

export default function CompanySection() {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return (
		<div className="companySectionContainer">
			<div>
				<img src={LogoutIcon} alt="cerrar sesión" width={40} onClick={handleLogout} />
			</div>
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
		</div>
	);
}
