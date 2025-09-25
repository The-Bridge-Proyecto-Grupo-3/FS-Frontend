import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import './register.css';

const RegisterVehicle = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		brand: '',
		model: '',
		license_plate: '',
		registration_date: '',
		type: '', // El tipo puede ser 'gas' o 'electric'
	});

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (
			!formData.brand ||
			!formData.model ||
			!formData.license_plate ||
			!formData.registration_date ||
			!formData.type
		) {
			setError('Todos los campos son obligatorios.');
			return;
		}

		try {
			const response = await api.post('/vehicles', formData);

			if (response.status === 201) {
				setSuccess('¡Vehículo registrado con éxito!');
				setTimeout(() => {
					navigate('/dashboard/vehicles'); // Redirige a la lista de vehículos
				}, 2000);
			}
		} catch (error) {
			const errorMessage =
				error.response?.data?.error ||
				'Error al registrar el vehículo. Inténtalo de nuevo.';
			setError(errorMessage);
			console.error(error);
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
							<label htmlFor="license_plate">Matricula</label>
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
					{error && <p className="error-message">{error}</p>}
					{success && <p className="success-message">{success}</p>}

					<input type="submit" value="Registrar" />
				</form>
			</div>
		</div>
	);
};

export default RegisterVehicle;
