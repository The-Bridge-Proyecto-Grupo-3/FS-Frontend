import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createVehicle } from '../../redux/vehicles/vehicleSlice';

import './register.css';
import GoBack from '../../components/Buttons/GoBack';
import { useForm } from '../../hooks/useForm';

const RegisterVehicle = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status } = useSelector(state => state.vehicles);

	const validation = {
		brand: value => [[value?.length > 0, 'Introduce marca del vehículo']],
		model: value => [[value?.length > 0, 'Introduce modelo del vehículo']],
		type: value => [[value, 'Introduce tipo de combustible']],
		license_plate: value => [[value?.length > 0, 'Introduce matrícula del vehículo']],
		registration_date: value => [[value, 'Introduce fecha de matriculación']],
	};

	const onSubmit = async () => dispatch(createVehicle(formData)).unwrap();

	const { formData, setFormData, message, success, handleInputChange, handleSubmit } = useForm({
		validation,
		onSubmit,
	});

	useEffect(() => {
		setFormData(prev => ({...prev,type:'gas'}));
	},[]);

	useEffect(() => {
		if(success)
			setTimeout(() => {
				navigate('/vehicles');
			}, 2000);
	}, [success]);

	return (<>
		<GoBack path='/driver' />
		<div className="register-container">

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
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-parts">
							<label htmlFor="model">Modelo</label>
							<input
								id="model"
								name="model"
								type="text"
								value={formData.model}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-parts">
							<label htmlFor="type">Tipo</label>
							<select
								name="type"
								id="type"
								className="select-custom"
								value={formData.type}
								onChange={handleInputChange}
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
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-parts">
							<label htmlFor="registration_date">Fecha de matriculación</label>
							<input
								id="registration_date"
								name="registration_date"
								type="date"
								value={formData.registration_date}
								onChange={handleInputChange}
							/>
						</div>
						{message && <span className="error">{message}</span>}
						{success && <span className="success">Vehículo registrado con éxito</span>}

						<input
							type="submit"
							value={status === 'loading' ? 'Registrando...' : 'Registrar'}
							disabled={status === 'loading'}
						/>
					</div>
				</form>
			</div>
		</div>
	</>);
};

export default RegisterVehicle;
