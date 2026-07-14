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

    // ENFOQUE HÍBRIDO: Validar mediante API Externa (reqres.in)
    if (username.toLowerCase() === 'eve.holt@reqres.in') {
      try {
        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // La API devolvió un token real
          const sessionData = {
            token: data.token, // Token proporcionado por Reqres
            id: 99,
            username: 'Eve Holt',
            email: username,
            firstName: 'Eve',
            lastName: 'Holt',
            image: 'https://reqres.in/img/faces/4-image.jpg',
          };
          window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionData));
          setLoading(false);
          navigate('/dashboard', { replace: true });
        } else {
          // La API rechazó el login (ej. falta contraseña o usuario inválido)
          setLoading(false);
          setErrorMsg(data.error || 'Credenciales rechazadas por la API externa.');
        }
      } catch (error) {
        setLoading(false);
        setErrorMsg('Error de conexión con la API externa.');
      }
      return; // Terminamos aquí si usó el correo de la API
    }

    // ENFOQUE HÍBRIDO: Validación Local para usuarios existentes
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
    }, 800);
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