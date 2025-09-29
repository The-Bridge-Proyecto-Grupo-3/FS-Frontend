import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReceipt } from '../../redux/receipts/receiptSlice';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import './register.css';

const RegisterReceipt = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector(state => state.auth);
	const { status, error: reduxError } = useSelector(state => state.receipts);

	const assignedVehicle = user?.Vehicle;

	const [formData, setFormData] = useState({
		price: '',
		quantity: '',
		mileage: '',
		fuel_type: '',
	});
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		if (!assignedVehicle) return;
		const vehicleType = assignedVehicle.type;
		if (vehicleType === 'electric') {
			setFormData(prev => ({ ...prev, fuel_type: 'electric' }));
		} else if (vehicleType === 'gas') {
			setFormData(prev => ({ ...prev, fuel_type: '' }));
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

		if (!formData.price || !formData.fuel_type) {
			alert(
				'Por favor, complete todos los campos obligatorios: Precio y Tipo de Combustible.'
			);
			return;
		}

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
				onClick={() => navigate('/driver')}
				style={{ cursor: 'pointer' }}
			>
				<img src={BackArrowIcon} alt="atras" width={30} />
			</div>

			<div className="form-container">
				<h2>Registro de ticktets</h2>

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
								value={formData.mileage}
								onChange={handleChange}
							/>
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
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterReceipt;
