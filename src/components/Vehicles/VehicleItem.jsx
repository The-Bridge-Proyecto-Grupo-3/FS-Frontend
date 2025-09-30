import { useNavigate } from 'react-router-dom';
import IconButton from '../IconButton/IconButton';

const VehicleItem = ({ vehicle }) => {
	const navigate = useNavigate();

	const handleViewDetails = () => {
		navigate(`/vehicles/${vehicle.id}`);
	};

	return (
		<tr onClick={handleViewDetails} >
			<td>{vehicle.brand}</td>
			<td>{vehicle.model}</td>
			<td>{vehicle.license_plate}</td>
			<td className='center'>{<IconButton icon={vehicle.state} style={{width:'20px', verticalAlign: 'middle'}}/>}</td>
			<td>{["No","Sí"][+(vehicle.in_use_by !== null)]}</td>
		</tr>
	);
};

export default VehicleItem;
