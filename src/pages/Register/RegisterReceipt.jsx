import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReceipt } from '../../redux/receipts/receiptSlice';
import './register.css';
import GoBack from '../../components/Buttons/GoBack';
import { useForm } from '../../hooks/useForm';

const RegisterReceipt = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector(state => state.auth);
	const assignedVehicle = user?.Vehicle;

	const { status } = useSelector(state => state.vehicles);

	const validation = {
		fuel_type: value => [[value, 'Introduce tipo de combustible del vehículo']],
		price: value => [[value, 'Introduce un precio']],
		quantity: value => [[value , 'Introduce cantidad']],
		mileage: value => [[value, 'Introduce kilometraje del vehículo']],
	};

	const onSubmit = async () => dispatch(createReceipt(formData)).unwrap();

	const { formData, setFormData, message, success, handleInputChange, handleSubmit } = useForm({
		validation,
		onSubmit,
	});

	useEffect(() => {
		if (!assignedVehicle) return;
		const vehicleType = assignedVehicle.type;
		if (vehicleType === 'electric') {
			setFormData(prev => ({ ...prev, fuel_type: 'electric' }));
		} else if (vehicleType === 'gas') {
			setFormData(prev => ({ ...prev, fuel_type: '' }));
		}
	}, [assignedVehicle]);

	useEffect(() => {
		if(success)
			setTimeout(() => {
				navigate('/driver');
			}, 2000);
	}, [success]);
	return (<>
		<GoBack path='/driver' />
		<div className="register-container">

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
									onChange={handleInputChange}
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
								onChange={handleInputChange}
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
								onChange={handleInputChange}
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
								onChange={handleInputChange}
							/>
						</div>

						{message && <span className="error">{message}</span>}
						{success && <span className="success">Recibo registrado con éxito</span>}

						<input
							type="submit"
							value={status === 'loading' ? 'Registrando...' : 'Registrar'}
							disabled={status === 'loading' || !assignedVehicle}
						/>
					</div>
				</form>
			</div>
		</div>
	</>);
};

export default RegisterReceipt;
