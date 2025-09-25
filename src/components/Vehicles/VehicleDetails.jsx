import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios'; //Cambiar
import './VehicleDetails.css';

const VehicleDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [vehicle, setVehicle] = useState({});
	const [formData, setFormData] = useState({
		brand: '',
		model: '',
		license_plate: '',
		registration_date: '',
		type: ''
	});
	const [loading, setLoading] = useState(true);
	const [editting, setEditting] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		const fetchVehicle = async () => {
			try {
				const response = await api.get(`/vehicles/${id}`, { headers: { Authorization: localStorage.getItem('accessToken')}});
				setVehicle(response.data);
				setFormData(response.data);
			} catch (error) {
				setError('Vehículo no encontrado o error al cargar los datos.');
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchVehicle();
	}, []);

	const handleUpdate = async e => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (
			!vehicle.brand ||
			!vehicle.model ||
			!vehicle.license_plate ||
			!vehicle.registration_date ||
			!vehicle.type
		) {
			setError('Todos los campos son obligatorios.');
			return;
		}

		try {
			const response = await api.put(`/vehicles/${id}`, formData, { headers: { Authorization: localStorage.getItem('accessToken')}});
			setSuccess('¡Vehículo actualizado con éxito!');
			console.log(success);
			setEditting(false);
			setVehicle({...formData});
		} catch (error) {
			const errorMessage =
				error.response?.data?.error ||
				'Error al registrar el vehículo. Inténtalo de nuevo.';
			setError(errorMessage);
			console.error(error);
		}
	};

	const handleDelete = async () => {
		if (
			!window.confirm(
				'¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer.'
			)
		) return;
		try {
			await api.delete(`/vehicles/${id}`, { headers: { Authorization: localStorage.getItem('accessToken')}});
			setSuccess('Vehículo eliminado con éxito.');
			setTimeout(() => navigate('/vehicles'),1000);
		} catch (error) {
			setError('No se pudo eliminar el vehículo.');
			console.error(error);
		}
	};

	const handleChange = (e) => {
		const { name,value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleReset = () => {
		setFormData({...vehicle});
		setEditting(false);
	}

	return (
		<div className='vehicleDetails'>
			<div className="form-container">
				<h2>Detalles del vehículo {vehicle.license_plate}</h2>
				{ !editting && <>
					<button onClick={() => setEditting(true)}>Editar vehículo</button>
					<button onClick={handleDelete}>Eliminar vehículo</button>
				</>}
				{ loading ? 
					<p>Loading...</p>:
					<form className="form-info" onSubmit={handleUpdate} onReset={handleReset}>
						<div className="input-container">
							<div className="form-parts">
								<label htmlFor="brand">Marca</label>
								<input
									id="brand"
									name="brand"
									type="text"
									value={formData.brand}
									onChange={handleChange}
									required
									disabled={!editting}
								/>
							</div>
							<div className="form-parts">
								<label htmlFor="model">Modelo</label>
								<input
									id="model"
									name="model"
									type="text"
									value={formData.model}
									onChange={handleChange}
									required
									disabled={!editting}
								/>
							</div>
							<div className="form-parts">
								<label htmlFor="type">Tipo</label>
								<select
									name="type"
									id="type"
									className="select-custom"
									value={formData.type}
									onChange={handleChange}
									required
									disabled={!editting}
								>
									<option value="" disabled>
										Seleccione el tipo de combustible
									</option>
									<option value="gas">Gasolina - Híbrido</option>
									{/* <option value="diesel">Diesel</option> */}
									{/* <option value="glp">GLP</option> */}
									<option value="electric">Eléctrico</option>
								</select>
							</div>
							<div className="form-parts">
								<label htmlFor="license_plate">Matricula</label>
								<input
									id="license_plate"
									name="license_plate"
									maxLength="8"
									type="text"
									value={formData.license_plate}
									onChange={handleChange}
									required
									disabled={!editting}
								/>
							</div>
							<div className="form-parts">
								<label htmlFor="registration_date">Fecha de matriculación</label>
								<input
									id="registration_date"
									name="registration_date"
									type="date"
									value={formData.registration_date}
									onChange={handleChange}
									required
									disabled={!editting}
								/>
							</div>
						</div>
						{error && <p className="error-message">{error}</p>}
						{success && <p className="success-message">{success}</p>}
						{editting && <>
								<input type="submit" value="Guardar" />
								<input type="reset" value="Cancelar" />
							</>
						}
					</form>
				}
			</div>
		</div>
	);
};

export default VehicleDetails;
