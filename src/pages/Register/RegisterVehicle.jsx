import BackArrowIcon from '../../assets/BackArrowIcon.png';
import './register.css';

const RegisterVehicle = () => {
	return (
		<div className="register-container">
			<div className="iconContainer">
				<img src={BackArrowIcon} alt="atras" width={30} />
			</div>

			<div className="form-container">
				<h2>Registro nuevo de Vehículo</h2>
				<form className="form-info">
					<div className="input-container">
						<div className="form-parts">
							<label htmlFor="brand">Marca</label>
							<input id="brand" name="brand" type="text" />
						</div>
						<div className="form-parts">
							<label htmlFor="model">Modelo</label>
							<input id="model" name="model" type="text" />
						</div>
						<div className="form-parts">
							<label htmlFor="fuel">Tipo</label>
							<select name="type" id="fuel" className="select-custom" value={''}>
								<option value="" disabled>Seleccione el tipo de combustible</option>
								<option value="gas">Gasolina - Híbrido</option>
								<option value="diesel">Diesel</option>
								<option value="glp">GLP</option>
								<option value="electric">Eléctrico</option>
							</select>
						</div>
						<div className="form-parts">
							<label htmlFor="plate">Matricula</label>
							<input id="plate" name="license_plate" maxLength="8" type="text" />
						</div>
						<div className="form-parts">
							<label htmlFor="date">Fecha de matriculación</label>
							<input id="date" name="registration_date" type="date" />
						</div>
					</div>

					<input type="submit" value="Registrar" />
				</form>
			</div>
		</div>
	);
};

export default RegisterVehicle;
