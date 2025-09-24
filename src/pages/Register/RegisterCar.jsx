import './Register.scss';

const RegisterCar = () => {
	return (
		<div className="register-container">
			<form>
				<h2>Registro nuevo de Vehículo</h2>

				<label htmlFor="brand">Marca</label>
				<input id="brand" name="brand" type="text" />

				<label htmlFor="model">Modelo</label>
				<input id="model" name="model" type="text" />

				<label htmlFor="fuel">Tipo</label>
				<select name="fuel" id="fuel" className="select-custom" value={'fuel0'}>
					<option value="fuel0">Seleccione el tipo de combustible</option>
					<option value="fuel1">Gasolina - Híbrido</option>
					<option value="fuel2">Diesel</option>
					<option value="fuel3">GLP</option>
					<option value="fuel4">Eléctrico</option>
				</select>

				<label htmlFor="plate">Matricula</label>
				<input id="plate" name="plate" type="text" />

				<label htmlFor="date">Fecha de matriculación</label>
				<input id="date" name="date" type="date" />

				<input type="submit" value="Registrar" />
			</form>
		</div>
	);
};

export default RegisterCar;
