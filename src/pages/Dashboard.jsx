import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard (Fase 2)</h1>
      <p>¡Bienvenido al sistema!</p>
      <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
    </div>
  );
}

export default Dashboard;
