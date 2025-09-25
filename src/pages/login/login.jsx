import { useState } from 'react';
import './login.css';
import loginImage from '../../assets/logo-deivigo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, verify2FA } from '../../redux/auth/authSlice';

function Login() {
	const dispatch = useDispatch();
	const { requires2FA, user } = useSelector(state => state.auth);

	const [form, setForm] = useState({ email: '', password: '' });
	const [code, setCode] = useState('');
	const [error, setError] = useState('');
	const onSubmit = e => {
		e.preventDefault();
		if (form.email && form.password) {
			dispatch(loginUser(form))
				.unwrap()
				.catch(err => setError(err));
		}
	};

	const onVerify2FA = e => {
		e.preventDefault();
		dispatch(verify2FA({ code, email: user.email }))
			.unwrap()
			.catch(err => setError(err));
	};

	if (requires2FA) {
		return (
			<div className="login-container">
				<img src={loginImage} alt="Logo DeiviGo" className="login-logo" />
				<div className="form-border">
					<h2>Verificación 2FA</h2>
					<form onSubmit={onVerify2FA} autoComplete="off">
						<label htmlFor="code" className="input-label">
							Códido doble factor
						</label>
						<input
							id="code"
							type="text"
							value={code}
							onChange={e => setCode(e.target.value)}
							required
							className="password-input"
						/>
						{error && <p className="error-text">{error}</p>}
						<button type="submit">Verificar</button>
					</form>
				</div>
			</div>
		);
	}

	// Formulario de login normal
	return (
		<div className="login-container">
			<img src={loginImage} alt="Logo DeiviGo" className="login-logo" />

			<div className="form-border">
				<form onSubmit={onSubmit} autoComplete="off">
					<label htmlFor="email" className="input-label email-label">
						Email
					</label>
					<input
						id="email"
						type="email"
						value={form.email}
						onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
						required
						className="input-email"
					/>
					<label htmlFor="password" className="input-label">
						Password
					</label>
					<input
						id="password"
						type="password"
						placeholder=""
						value={form.password}
						autoComplete="new-password"
						onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
						required
						className="password-input"
					/>
					{error && <p className="error-text">{error}</p>}
					<button type="submit">Login</button>
				</form>
			</div>

			<div className="login-links">
				<a href="#">Nueva Empresa</a>
				<a href="#">Soy una empresa</a>
			</div>
		</div>
	);
}

export default Login;
