import BackArrowIcon from '../../assets/BackArrowIcon.png';
import './register.css';

const RegisterCompany = () => {
	return (
		<div className="register-container">
			<div className="iconContainer">
				<img src={BackArrowIcon} alt="atras" width={30} />
			</div>

			<div className="form-container">
				<h2>Registro nuevo de Empresa</h2>
				<form className="form-info">
					<div className="input-container">
						<div className="form-parts">
							<label htmlFor="companyname">Empresa</label>
							<input id="companyname" name="name" type="text" />
						</div>
						<div className="form-parts">
							<label htmlFor="cif">CIF</label>
							<input id="cif" name="CIF" maxLength="9" type="text" />
						</div>
						<div className="form-parts">
							<label htmlFor="address">Dirección</label>
							<input id="address" name="address" type="text" />
						</div>
						<div className="form-parts">
							<label htmlFor="region">Provincia</label>
							<input id="region" name="region" type="text" />
						</div>
						<div className="form-parts">
							<label htmlFor="email">Email</label>
							<input id="email" name="email" type="text" />
						</div>
						<div className="form-parts">
							<label htmlFor="password">Contraseña</label>
							<input id="password" name="password" type="password" />
						</div>
						<div className="form-parts">
							<label htmlFor="reppassword">Repite Contraseña</label>
							<input id="reppassword" name="reppassword" type="password" />
						</div>
					</div>

					<input type="submit" value="Registrar" />
				</form>
			</div>
		</div>
	);
};

export default RegisterCompany;
