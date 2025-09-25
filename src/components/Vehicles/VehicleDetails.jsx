import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api'; //Cambiar
import './VehicleDetails.css';

const VehicleDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [vehicle, setVehicle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchVehicle = async () => {
			try {
				const response = await api.get(`/vehicles/${id}`);
				setVehicle(response.data);
			} catch (error) {
				setError('Vehículo no encontrado o error al cargar los datos.');
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchVehicle();
	}, [id]);

	const handleDelete = async () => {
		// Confirm delete
		if (
			window.confirm(
				'¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer.'
			)
		) {
			try {
				await api.delete(`/vehicles/${id}`);
				alert('Vehículo eliminado con éxito.');
				navigate('/vehicles');
			} catch (error) {
				setError('No se pudo eliminar el vehículo.');
				console.error(error);
			}
		}
	};

	// Navega a una futura página de edición
	const handleEdit = () => {
		navigate(`/vehicles/edit/${id}`);
	};

	return <div>VehicleDetails</div>;
};

export default VehicleDetails;
