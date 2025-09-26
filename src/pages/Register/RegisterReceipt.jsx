import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReceipt } from '../../redux/receipts/receiptSlice';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import './register.css';

const RegisterReceipt = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Obtener el objeto de usuario completo, que ahora incluye el vehículo
	const { user } = useSelector(state => state.auth);
	const { status, error: reduxError } = useSelector(state => state.receipts);

	// El vehículo asignado está directamente en el objeto de usuario
	const assignedVehicle = user?.Vehicle;

	const [formData, setFormData] = useState({
		price: '',
		quantity: '',
		mileage: '',
		fuel_type: '', // Se gestionará de forma automática o por el usuario
	});
	const [success, setSuccess] = useState(null);

	// Efecto para pre-rellenar el tipo de combustible si se puede inferir
	useEffect(() => {
		if (assignedVehicle) {
			const vehicleType = assignedVehicle.type;
			// Si el tipo de vehículo no es 'gas', podemos inferir el fuel_type
			if (vehicleType !== 'gas') {
				// Asumimos que el 'type' del vehículo (e.g., 'diesel', 'electric')
				// corresponde directamente con una opción de 'fuel_type' del recibo.
				setFormData(prev => ({ ...prev, fuel_type: vehicleType }));
			} else {
				// Si es 'gas', reseteamos para que el usuario elija
				setFormData(prev => ({ ...prev, fuel_type: '' }));
			}
		}
	}, [assignedVehicle]);

	const handleChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setSuccess(null);

		if (!user || !assignedVehicle) {
			alert('No se pudo encontrar la información del conductor o del vehículo.');
			return;
		}

		// Validar que los campos obligatorios (incluido el fuel_type si es necesario) estén llenos
		if (!formData.price || !formData.fuel_type) {
			alert(
				'Por favor, complete todos los campos obligatorios: Precio y Tipo de Combustible.'
			);
			return;
		}

		// const receiptData = {
		// 	price: formData.price,
		// 	quantity: formData.quantity || null, // Enviar null si está vacío
		// 	mileage: formData.mileage || null, // Enviar null si está vacío
		// 	driver_id: user.id,
		// 	vehicle_id: assignedVehicle.id,
		// 	fuel_type: formData.fuel_type,
		// };

		try {
			await dispatch(createReceipt(formData)).unwrap();
			setSuccess('¡Recibo registrado con éxito!');
			setFormData({ price: '', quantity: '', mileage: '', fuel_type: formData.fuel_type });

			setTimeout(() => {
				navigate(-1);
			}, 2000);
		} catch (error) {
			console.error('Fallo al registrar el recibo:', error);
		}
	};

	return (
		<div className="register-container">
			<div
				className="iconContainer"
				onClick={() => navigate(-1)}
				style={{ cursor: 'pointer' }}
			>
				<img src={BackArrowIcon} alt="atras" width={30} />
			</div>

			<div className="form-container">
				<h2>Registro nuevo de Recibo</h2>

				{user && assignedVehicle && (
					<div className="info-box">
						<p>
							<strong>Conductor:</strong> {user.first_name} {user.last_name}
						</p>
						<p>
							<strong>Vehículo:</strong> {assignedVehicle.brand}{' '}
							{assignedVehicle.model} ({assignedVehicle.license_plate})
						</p>
					</div>
				)}

				<form className="form-info" onSubmit={handleSubmit}>
					<div className="input-container">
						{assignedVehicle?.type === 'gas' && (
							<div className="form-parts">
								<label htmlFor="fuel_type">Tipo de Gasolina</label>
								<select
									name="fuel_type"
									id="fuel_type"
									className="select-custom"
									value={formData.fuel_type}
									onChange={handleChange}
									required
								>
									<option value="" disabled>
										Seleccione el tipo
									</option>
									<option value="95">Gasolina 95</option>
									<option value="98">Gasolina 98</option>
									<option value="diesel">Diésel</option>
									<option value="GLP">GLP</option>
								</select>
							</div>
						)}

						<div className="form-parts">
							<label htmlFor="price">Precio (€)</label>
							<input
								id="price"
								name="price"
								type="number"
								min="0"
								step="0.01"
								placeholder="Ej: 50.25"
								value={formData.price}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="form-parts">
							<label htmlFor="quantity">Cantidad (L/kWh)</label>
							<input
								id="quantity"
								name="quantity"
								type="number"
								min="0"
								step="0.01"
								placeholder="Opcional"
								value={formData.quantity}
								onChange={handleChange}
							/>
						</div>

						<div className="form-parts">
							<label htmlFor="mileage">Kilometraje (km)</label>
							<input
								id="mileage"
								name="mileage"
								type="number"
								min="0"
								placeholder="Opcional"
								value={formData.mileage}
								onChange={handleChange}
							/>
						</div>
					</div>

					{status === 'failed' && reduxError && (
						<p className="error-message">{reduxError}</p>
					)}
					{success && <p className="success-message">{success}</p>}

					<input
						type="submit"
						value={status === 'loading' ? 'Registrando...' : 'Registrar'}
						disabled={status === 'loading' || !assignedVehicle}
					/>
				</form>
			</div>
		</div>
	);
};

export default RegisterReceipt;
