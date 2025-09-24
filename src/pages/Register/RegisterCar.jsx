import BackArrowIcon from '../../assets/BackArrowIcon.png';
import './register.css';

const RegisterCar = () => {
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
							<select name="fuel" id="fuel" className="select-custom" value={'fuel0'}>
								<option value="fuel0">Seleccione el tipo de combustible</option>
								<option value="fuel1">Gasolina - Híbrido</option>
								<option value="fuel2">Diesel</option>
								<option value="fuel3">GLP</option>
								<option value="fuel4">Eléctrico</option>
							</select>
						</div>
						<div className="form-parts">
							<label htmlFor="plate">Matricula</label>
							<input id="plate" name="plate" type="text" />
						</div>
						<div className="form-parts">
							<label htmlFor="date">Fecha de matriculación</label>
							<input id="date" name="date" type="date" />
						</div>
					</div>

					<input type="submit" value="Registrar" />
				</form>
			</div>
		</div>
	);
};

export default RegisterCar;
