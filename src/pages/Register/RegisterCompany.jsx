import './Register.scss';

const RegisterCompany = () => {
	return (
		<div className="register-container">
			<form>
				<h2>Registro nuevo de Empresa</h2>

				<label htmlFor="companyname">Empresa</label>
				<input id="companyname" name="companyname" type="text" />

				<label htmlFor="cif">CIF</label>
				<input id="cif" name="cif" type="text" />

				<label htmlFor="adress">Dirección</label>
				<input id="adress" name="adress" type="text" />

				<label htmlFor="prov">Provincia</label>
				<input id="prov" name="prov" type="text" />

				<label htmlFor="email">Email</label>
				<input id="email" name="email" type="text" />

				<label htmlFor="password">Contraseña</label>
				<input id="password" name="password" type="password" />

				<label htmlFor="reppassword">Repite Contraseña</label>
				<input id="reppassword" name="reppassword" type="password" />

				<input type="submit" value="Registrar" />
			</form>
		</div>
	);
};

export default RegisterCompany;
