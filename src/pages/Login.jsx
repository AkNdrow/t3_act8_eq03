import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Validación de que no estén vacíos
    if (!username || !password) {
      setErrorMsg('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60, 
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Respuesta de la API (Usuario logueado):', data);
        // Si es exitoso, redirigimos a /dashboard
        navigate('/dashboard');
      } else {
        // DummyJSON retorna un mensaje de error si falla
        console.error('Error del servidor:', data.message);
        setErrorMsg('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setErrorMsg('Ocurrió un error de red. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Inicio de Sesión</h2>
        <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Usuario o Correo</label>
            <input 
              id="username"
              type="text" 
              placeholder="ej. emilys"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errorMsg && !username ? 'input-error' : ''}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              placeholder="ej. emilyspass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errorMsg && !password ? 'input-error' : ''}
            />
          </div>

          {/* Mensaje de error de validación/API */}
          <div className="error-container">
            {errorMsg && <p className="error-text">{errorMsg}</p>}
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;