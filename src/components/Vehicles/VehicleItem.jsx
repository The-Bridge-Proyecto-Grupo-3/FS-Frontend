import { useNavigate } from 'react-router-dom';

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
			<td>{vehicle.in_use_by === null ? 'No' : vehicle.in_use_by}</td>
		</tr>
	);
};

export default VehicleItem;
