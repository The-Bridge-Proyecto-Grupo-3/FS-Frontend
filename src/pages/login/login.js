import { useState } from 'react';
import api from '../api/axios.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.js';
import './login.css';

export default function Login() {
	const [form, setForm] = useState({ email: '', password: '' });
	const [msg, setMsg] = useState('');
	const navigate = useNavigate();
	const { loginWithToken } = useAuth();

	async function onSubmit(e) {
		e.preventDefault();
		setMsg('');
		try {
			const { data } = await api.post('/api/auth/login', form);
			if (data.requires2FA) {
				sessionStorage.setItem('tempToken', data.tempToken);
				return navigate('/2fa');
			} else {
				loginWithToken(data.accessToken);
				navigate('/dashboard');
			}
		} catch (e) {
			if (e?.response?.data?.error === 'EMAIL_NOT_VERIFIED') {
				setMsg('Correo no verificado. Reenviar verificación.');
			}
			setMsg(e?.response?.data?.error ?? 'Error');
		}
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<input
					placeholder="Email"
					value={form.email}
					onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
				/>
				<input
					placeholder="Contraseña"
					type="password"
					value={form.password}
					onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
				/>
				<button type="submit">Entrar</button>
				<button
					onClick={async () => {
						try {
							await api.post('/api/auth/verify-email/resend', {
								email: form.email,
							});
							setMsg('Correo enviado. Revisa tu bandeja.');
						} catch {
							setMsg('No se pudo enviar el correo.');
						}
					}}
				>
					Reenviar verificación
				</button>
			</form>
			<p>{msg}</p>
		</div>
	);
}
