import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { registerDriver } from '../../redux/drivers/driverSlice';
import BackArrowIcon from '../../assets/BackArrowIcon.png';
import { Link } from 'react-router-dom';
import './register.css';
import GoBack from '../../components/Buttons/GoBack';

const RegisterDriver = () => {
	const dispatch = useDispatch();

	const validation = {
		first_name: value => [[value?.length > 0, 'El nombre no puede estar vacío']],
		last_name: value => [[value?.length > 0, 'El apellido no puede estar vacío']],
		email: value => [
			[
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					value
				),
				'Email no válido',
			],
		],
		password: value => [
			[/[a-z]+/.test(value), 'La contraseña debe contener minúsculas'],
			[/[A-Z]+/.test(value), 'La contraseña debe contener mayúsculas'],
			[/[0-9]+/.test(value), 'La contraseña debe contener números'],
			[/[^\w\s]+/.test(value), 'La contraseña debe contener símbolos especiales'],
			[value?.length >= 8, 'La contraseña debe tener 8 caracteres o más'],
		],
	};

	const onSubmit = formData => dispatch(registerDriver(formData));

	const { formData, message, success, handleInputChange, handleSubmit } = useForm({
		validation,
		onSubmit,
	});

	return (<>
		<GoBack path='/company' />
		<div className="register-container">
			{success ? (
				<>
					<h1>¡Se ha registrado correctamente!</h1>
					<p>Por favor, revise su email para verificar la cuenta</p>
				</>
			) : (
				<div className="form-container">
					<h2>Registro nuevo de Conductor</h2>
					<form onSubmit={handleSubmit} className="form-info">
						<div className="input-container">
							<div className="form-parts">
								<label htmlFor="firstname">Nombre</label>
								<input
									id="firstname"
									name="first_name"
									className={formData.first_name && 'validate'}
									type="text"
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-parts">
								<label htmlFor="lastname">Apellidos</label>
								<input
									id="lastname"
									name="last_name"
									className={formData.last_name && 'validate'}
									type="text"
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-parts">
								<label htmlFor="email">Email</label>
								<input
									id="email"
									name="email"
									className={formData.email && 'validate'}
									type="text"
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-parts">
								<label htmlFor="password">Contraseña</label>
								<input
									id="password"
									name="password"
									className={formData.password && 'validate'}
									type="password"
									onChange={handleInputChange}
								/>
							</div>
							<span className="error">{message}</span>
							<input type="submit" value="Registrar" />
						</div>
					</form>
				</div>
			)}
		</div>
	</>);
};

export default RegisterDriver;
