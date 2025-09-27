import { useDispatch, useSelector } from 'react-redux';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import { useForm } from '../../hooks/useForm';
import './register.css';
import { registerCompany } from '../../redux/companies/companySlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterCompany = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { emailSent } = useSelector(state => state.companies);
    
    const validation = {
        email: value => [[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),"Invalid email"]],
        password: value => [
            [/[a-z]+/.test(value), 'La contraseña debe contener letras minúsculas'],
            [/[A-Z]+/.test(value), 'La contraseña debe contener letras mayúsculas'],
            [/[0-9]+/.test(value), 'La contraseña debe contener números'],
            [/[^A-Za-z0-9]+/.test(value), 'La contraseña debe contener símbolos especiales'],
            [value && value.length >= 8, 'La contraseña debe tener 8 o más caracteres'],
        ],
        reppassword: value => [[value == formData.password, 'Las contraseñas no coinciden']],
		name: value => [[value && value.length > 0, "Introduce nombre de la empresa"]],
		CIF: cif => [[
			(() => {
				if(!cif || typeof cif != "string" || cif.length != 9) return false;
				if(!/^[A-HJNP-SU-W]\d{7}[0-9A-J]$/.test(cif)) return false;
				if((cif.substring(1,3) === "00" || /[NP-SW]/.test(cif[0])) && !/[A-J]/.test(cif[8])) return false;
				if(/[ABEH]/.test(cif[0]) && !/\d/.test(cif[8])) return false;

				let control = cif[8];
				if(/[A-J]/.test(control)) control = (cif[8].charCodeAt(0)-54)%10;
				const sumEven = (+cif[2]) + (+cif[4]) + (+cif[6]);
				let sumOdd = 0;
				for(let i = 1; i <= 7; i+=2) {
					const prod = 2*(+cif[i]);
					sumOdd += prod < 10 ? prod:prod-9;
				}
				const res = (10-(sumEven + sumOdd)%10)%10;
				return res == control;
			})(),
			"CIF invalido"
		]],
		address: value => [[value && value.length > 0, "Introduce una dirección"]],
		state: value => [[value && value.length > 0, "Introduce una provincia"]],
		postal_code: value => [[value !== null && value !== "", "Introduce un código postal"]],
		payment_entity: value => [[value !== null && value !== "", "Introduce una entidad de pago"]],
    };

	
    const onSubmit = async () => dispatch(registerCompany(formData)).unwrap();
	
    const { formData, message, success, handleInputChange, handleSubmit } = useForm({ validation, onSubmit });
	useEffect(() => {
		if(!success) return;
		setTimeout(() => {
			navigate('/login');
		}, 2000);
	},[success])
	
	return (
		<div className="register-container">
			<div className="iconContainer" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
				<img src={BackArrowIcon} alt="atras" width={30} />
			</div>

			{ success ? (
				<>
					<h1>¡Se ha registrado correctamente!</h1>
					{emailSent && <p>Por favor, revise su email para verificar la cuenta</p> }
				</>
			) : (
				<div className="form-container">
					<h2>Registro nuevo de Empresa</h2>
					<form className="form-info" onSubmit={handleSubmit}>
						<div className="input-container">
							<div className="form-parts">
								<label htmlFor="companyname">Empresa</label>
								<input id="companyname" name="name" type="text" onChange={handleInputChange} />
							</div>
							<div className="form-parts">
								<label htmlFor="cif">CIF</label>
								<input id="cif" name="CIF" maxLength="9" type="text" onChange={handleInputChange} />
							</div>
							<div className="form-parts">
								<label htmlFor="address">Dirección</label>
								<input id="address" name="address" type="text" onChange={handleInputChange} />
							</div>
							<div className="form-parts">
								<label htmlFor="region">Provincia</label>
								<input id="region" name="state" type="text" onChange={handleInputChange} />
							</div>
							<div className="form-parts">
								<label htmlFor="postalcode">Código postal</label>
								<input id="postalcode" name="postal_code" type="integer" maxLength={5} onChange={handleInputChange} />
							</div>
							<div className="form-parts">
								<label htmlFor="bank">Entidad de pago</label>
								<select id="bank" name="payment_entity" defaultValue="" onChange={handleInputChange}>
									<option value="" disabled>Seleccione entidad de pago</option>
									<option value="bbva">BBVA</option>
									<option value="repsol">Repsol</option>
									<option value="ing">ING</option>
									<option value="abaanca">Abanca</option>
									<option value="adamur">Adamur</option>
								</select>
							</div>
							<div className="form-parts">
								<label htmlFor="email">Email</label>
								<input id="email" name="email" type="text" onChange={handleInputChange} />
							</div>
							<div className="form-parts">
								<label htmlFor="password">Contraseña</label>
								<input id="password" name="password" type="password" onChange={handleInputChange} />
							</div>
							<div className="form-parts">
								<label htmlFor="reppassword">Repite Contraseña</label>
								<input id="reppassword" name="reppassword" type="password" onChange={handleInputChange} />
							</div>
						</div>
						<span className="error-message">{message}</span>
						<input type="submit" value="Registrar empresa" />
					</form>
				</div>
			)}
		</div>
	);
};

export default RegisterCompany;
