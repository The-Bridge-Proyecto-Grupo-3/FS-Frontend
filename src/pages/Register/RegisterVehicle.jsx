import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createVehicle } from '../../redux/vehicles/vehicleSlice';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import { Link } from 'react-router-dom';
import './register.css';

const RegisterVehicle = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, error: reduxError } = useSelector(state => state.vehicles);

	const [formData, setFormData] = useState({
		brand: '',
		model: '',
		license_plate: '',
		registration_date: '',
		type: '', // El tipo puede ser 'gas' o 'electric'
	});

	const [success, setSuccess] = useState(null);

	const handleChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setSuccess(null);

		if (Object.values(formData).some(value => String(value).trim() === '')) {
			alert('Todos los campos son obligatorios.');
			return;
		}

		try {
			await dispatch(createVehicle(formData)).unwrap();

			setSuccess('¡Vehículo registrado con éxito!');
			setFormData({
				brand: '',
				model: '',
				license_plate: '',
				registration_date: '',
				type: '',
			});
			setTimeout(() => {
				navigate('/company'); // Redirige a la lista de vehículos
			}, 2000);
		} catch (error) {
			console.error('Fallo al registrar el vehículo:', error);
		}
	};

	return (
		<div className="register-container">
			<div className="iconContainer">
				<Link to="/driver">
					<img src={BackArrowIcon} alt="atras" width={30} />
				</Link>
			</div>

			<div className="form-container">
				<h2>Registro nuevo de Vehículo</h2>
				<form className="form-info" onSubmit={handleSubmit}>
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
							<label htmlFor="license_plate">Matrícula</label>
							<input
								id="license_plate"
								name="license_plate"
								maxLength="8"
								type="text"
								value={formData.license_plate}
								onChange={handleChange}
								required
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
						disabled={status === 'loading'}
					/>
				</form>
			</div>
		</div>
	);
};

export default RegisterVehicle;
