import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicleById, deleteVehicle, updateVehicle } from '../../redux/vehicles/vehicleSlice';
import './VehicleDetails.css';
import GoBack from '../Buttons/GoBack';
import IconButton from '../IconButton/IconButton';

const VehicleDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { selectedVehicle, status, error: reduxError } = useSelector(state => state.vehicles);

	const [formData, setFormData] = useState({
		brand: '',
		model: '',
		license_plate: '',
		registration_date: '',
		type: '',
	});
	const [editting, setEditting] = useState(false);

	useEffect(() => {
		dispatch(fetchVehicleById(id));
	}, [id]);

	useEffect(() => {
		if (selectedVehicle) {
			setFormData({ ...selectedVehicle });
		}
	}, [selectedVehicle]);

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleUpdate = async e => {
		e.preventDefault();

		if (Object.values(formData).some(value => String(value).trim() === '')) {
			alert('Todos los campos son obligatorios.');
			return;
		}

		try {
			await dispatch(updateVehicle({ id, ...formData })).unwrap();
			alert('¡Vehículo actualizado con éxito!');
			setEditting(false);
		} catch (error) {
			console.error('Fallo al actualizar el vehículo:', error);
		}
	};

	const handleDelete = async () => {
		if (
			!window.confirm(
				'¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer.'
			)
		)
			return;
		try {
			await dispatch(deleteVehicle(id)).unwrap();
			alert('Vehículo eliminado con éxito.');
			setTimeout(() => navigate('/vehicles'), 1000);
		} catch (error) {
			console.error('Fallo al eliminar el vehículo:', error);
		}
	};

	const handleReset = () => {
		setFormData({ ...selectedVehicle });
		setEditting(false);
	};

	if (status === 'loading' && !selectedVehicle) {
		return <p>Cargando datos del vehículo...</p>;
	}

	if (status === 'failed' && !selectedVehicle) {
		return <p className="error-message">{reduxError}</p>;
	}

	return (
		<div className="vehicleDetails">
			<GoBack path='/vehicles' />
			<div className="form-container">
				<h2>Detalles del vehículo {selectedVehicle?.license_plate}</h2>
				{!editting && (
					<div className="action-buttons">
						<IconButton icon='back' onClick={() => setEditting(true)} title='Editar vehículo' />
						<IconButton icon='back' onClick={handleDelete} title='Eliminar vehículo' />
					</div>
				)}

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

					{status === 'failed' && <p className="error-message">{reduxError}</p>}

					{editting && (
						<div className="action-buttons">
							<input type="submit" value="Guardar" disabled={status === 'loading'} />
							<input type="reset" value="Cancelar" />
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default VehicleDetails;
