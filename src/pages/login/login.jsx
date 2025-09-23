import { useState } from 'react';
import './login.css';
import loginImage from '../../assets/logo-deivigo.svg';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
  };

  return (
    <div className="login-container">
      {/* Logo DeiviGo */}
      <img src={loginImage} alt="Logo DeiviGo" className="login-logo" />

      {/* Borde del formulario */}
      <div className="form-border">
        <form onSubmit={onSubmit} autoComplete="off">
          {/* Email */}
          <label htmlFor="email" className="input-label email-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder=""
            value={form.email}
            autoComplete="new-email"
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            className="input-email"
          />

          {/* Password */}
          <label htmlFor="password" className="input-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder=""
            value={form.password}
            autoComplete="new-password"
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
            className="password-input"
          />

          {/* Botón Login */}
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Enlaces debajo del formulario */}
      <div className="login-links">
        <a href="#">Nueva Empresa</a>
        <a href="#">Soy una empresa</a>
      </div>
    </div>
  );
}

export default Login;
