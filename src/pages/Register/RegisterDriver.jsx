import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { registerDriver } from '../../redux/auth/authSlice';
import './Register.scss';

const RegisterDriver = () => {
	const dispatch = useDispatch();

	const validation = {
		username: value => {
			value = value ? value.trim() : '';
			return [
				[
					value.length >= 3 && value.length <= 24,
					'El nombre debe contener entre 3 y 24 caracteres',
				],
			];
		},
		surname: value => [[value && value.trim().length > 0, 'El apellido no puede estar vacío']],
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
			[/[^A-Za-z0-9]+/.test(value), 'La contraseña debe contener símbolos especiales'],
			[value && value.length >= 8, 'La contraseña debe tener 8 caracteres o más'],
		],
		// reppassword: value => [[value == formData.password, 'Passwords do not match']],
	};

	const onSubmit = form => dispatch(registerDriver(new FormData(form))).unwrap();

	const { formData, message, success, handleInputChange, handleSubmit } = useForm({
		validation,
		onSubmit,
	});

	return (
		<div className="register-container">
			{success ? (
				<>
					<h1>¡Se ha registrado correctamente!</h1>
					<p>Por favor, revise su email para verificar la cuenta</p>
				</>
			) : (
				<form onSubmit={handleSubmit}>
					<h2>Registro nuevo de Conductor</h2>
					<div>
						<label htmlFor="username">Nombre</label>
						<input
							id="username"
							name="username"
							className={formData.username && 'validate'}
							type="text"
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="surname">Apellidos</label>
						<input
							id="surname"
							name="surname"
							className={formData.surname && 'validate'}
							type="text"
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							className={formData.email && 'validate'}
							type="text"
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="password">Contraseña</label>
						<input
							id="password"
							name="password"
							className={formData.password && 'validate'}
							type="password"
							placeholder="Password"
							onChange={handleInputChange}
						/>
					</div>
					{/* <div>
						<label htmlFor="reppassword">Repeat password:</label>
						<input
							id="reppassword"
							name="reppassword"
							className={formData.reppassword && 'validate'}
							type="password"
							placeholder="Repeat password"
							onChange={handleInputChange}
						/>
					</div> */}
					<span className="error">{message}</span>
					<input type="submit" value="Registrar" />
				</form>
			)}
		</div>
	);
};

export default RegisterDriver;
