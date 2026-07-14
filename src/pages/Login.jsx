import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const USER_STORAGE_KEY = 'clevernote_user';

function getStoredUser() {
  try {
    const savedUser = window.localStorage.getItem(USER_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser?.token) {
      
navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);

    // Simularemos la respuesta de una API para validar a los 2 usuarios específicos
    setTimeout(() => {
      const isValidAndres = username === 'Andres' && password === 'Admin123';
      const isValidMoises = username === 'Moises' && password === 'Admin456';

      if (isValidAndres || isValidMoises) {
        const sessionData = {
          token: `token-simulado-fase2-${username.toLowerCase()}`,
          id: isValidAndres ? 1 : 2,
          username: username,
          email: `${username.toLowerCase()}@correo.com`,
          firstName: username,
          lastName: 'Usuario',
          image: 'https://placehold.co/48x48', 
        };

        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionData));
        setLoading(false);
        
        navigate('/dashboard', { replace: true });
      } else {
        setLoading(false);
        setErrorMsg('Usuario o contraseña incorrectos.');
      }
    }, 800); // Simulamos el tiempo de respuesta de red de una API
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
              placeholder="ej. andres"
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
              placeholder="ej. 12345"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errorMsg && !password ? 'input-error' : ''}
            />
          </div>

          <div className="error-container">
            {errorMsg && <p className="error-text">{errorMsg}</p>}
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;