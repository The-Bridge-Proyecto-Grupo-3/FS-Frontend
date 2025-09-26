import { useEffect, useState } from 'react';
import './login.css';
import loginImage from '../../assets/logo-deivigo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, verify2FA } from '../../redux/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { requires2FA, user, role } = useSelector(state => state.auth);

	const [form, setForm] = useState({ email: '', password: '', code: ''});
	const [error, setError] = useState('');

	useEffect(() => {
		if(user) navigate(`/${role}`);
	},[user]);

	const onSubmit = e => {
		e.preventDefault();
		if(requires2FA) {
			dispatch(verify2FA(form.code)).unwrap().catch(setError);
		} else if(form.email && form.password) {
			dispatch(loginUser({ email: form.email, password: form.password })).unwrap().catch(setError);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value.trim() }));
	};

	return (!user &&
		<div className="login-container">
			<img src={loginImage} alt="Logo DeiviGo" className="login-logo" />
			<div className="form-border">
				<h2>{ requires2FA ? 'Verificación 2FA':'Inicio de sesión'}</h2>
				<form onSubmit={onSubmit} autoComplete="off">
					{ requires2FA ?
					<>
						<label htmlFor="code" className="input-label">
							Código 2FA
						</label>
						<input
							id="code"
							className="password-input"
							name="code"
							type="number"
							maxLength="6"
							value={form.code}
							onChange={handleChange}
							required
						/>
					</>:<>
						<label htmlFor="email" className="input-label email-label">
							Email
						</label>
						<input
							id="email"
							className="input-email"
							name="email"
							type="email"
							value={form.email}
							onChange={handleChange}
							required
						/>
						<label htmlFor="password" className="input-label">
							Contraseña
						</label>
						<input
							id="password"
							className="password-input"
							name="password"
							type="password"
							value={form.password}
							onChange={handleChange}
							required
						/>
					</>
					}
					{error && <p className="error-text">{error}</p>}
					<button type="submit">{requires2FA ? 'Verificar':'Iniciar sesión'}</button>
				</form>
			</div>
			
			{ !requires2FA &&
				<div className="login-links">
					<Link to="/register">Nueva Empresa</Link>
				</div>
			}
		</div>
	);
}

export default Login;
