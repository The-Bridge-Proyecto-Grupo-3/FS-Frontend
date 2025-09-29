import LogoutButton from '../../../components/Buttons/LogoutButton';
import './adminSection.css';
import { useSelector } from 'react-redux';

export default function CompanySection() {
	const { user } = useSelector(state => state.auth);
	return (
		<div className="adminSectionContainer">
			<LogoutButton />
			<div>
				<h2>Hola Admin</h2>
			</div>
		</div>
	);
};