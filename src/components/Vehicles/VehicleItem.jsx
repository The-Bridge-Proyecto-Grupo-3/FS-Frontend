import { useNavigate } from 'react-router-dom';
import './VehicleDetails.css';
import { TableCell, TableRow } from '@mui/material';

const VehicleItem = ({ vehicle }) => {
	const navigate = useNavigate();

	const handleViewDetails = () => {
		navigate(`/vehicles/${vehicle.id}`);
	};

	return (
		<TableRow
			key={vehicle.licence_plate}
			sx={{
				'&:hover': {
					backgroundColor: '#A8A7A7',
				},
			}}
			onClick={handleViewDetails}
		>
			<TableCell component="td" scope="row">
				{vehicle.brand}
			</TableCell>
			<TableCell>{vehicle.model}</TableCell>
			<TableCell>{vehicle.license_plate}</TableCell>
			<TableCell>
				{vehicle.in_use_by === null ? 'No' : vehicle.in_use_by}
			</TableCell>
		</TableRow>
	);
};

export default VehicleItem;
