import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navegar = useNavigate();
  
  
  const datosGuardados = window.localStorage.getItem('clevernote_user');
  const usuario = datosGuardados ? JSON.parse(datosGuardados) : null;

  
  const nombreCompleto = usuario
    ? `${usuario.firstName || ''} ${usuario.lastName || ''}`.trim()
    : 'Usuario Invitado';

  
  const manejarCerrarSesion = () => {
    window.localStorage.removeItem('clevernote_user');
    navegar('/login', { replace: true });
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img 
          src={usuario?.image || 'https://via.placeholder.com/40'} 
          alt={nombreCompleto} 
          style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
        />
        <span>Bienvenido, <strong>{nombreCompleto}</strong></span>
      </div>

      <button 
        type="button" 
        onClick={manejarCerrarSesion}
        style={{
          padding: '6px 12px',
          backgroundColor: '#d9534f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Cerrar Sesión
      </button>
    </header>
  );
}

export default Navbar;
