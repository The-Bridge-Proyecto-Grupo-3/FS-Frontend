import { useNavigate } from 'react-router-dom';
import './VehicleDetails.css';

const VehicleItem = ({ vehicle }) => {
	const navigate = useNavigate();

	const handleViewDetails = () => {
		navigate(`/vehicles/${vehicle.id}`);
	};

	return (
		<li className="vehicle-item" onClick={handleViewDetails}>
			<div className="vehicle-info">
				<span className="vehicle-brand-model">
					{vehicle.brand} {vehicle.model}
				</span>
				<span className="vehicle-plate">{vehicle.license_plate}</span>
			</div>
			<span className="view-details-arrow">&rarr;</span>
		</li>
	);
};

export default VehicleItem;
