import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

function Navbar() {
  const navegar = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modalLogoutAbierto, setModalLogoutAbierto] = useState(false);
  
  const datosGuardados = window.localStorage.getItem('clevernote_user');
  const usuario = datosGuardados ? JSON.parse(datosGuardados) : null;
  const nombreCompleto = usuario ? `${usuario.firstName || ''} ${usuario.lastName || ''}`.trim() : 'Usuario Invitado';

  const confirmarCerrarSesion = () => {
    window.localStorage.removeItem('clevernote_user');
    setModalLogoutAbierto(false);
    navegar('/login', { replace: true });
  };

  return (
    <>
      <header className="navbar">
        <h1>Tablero de Proyectos</h1>

        <div className="navbar-right" onClick={() => setMenuAbierto(!menuAbierto)}>
          <div className="user-info">
            <span className="user-name" style={{ textDecoration: 'underline' }}>{nombreCompleto}</span>
            <span className="user-role">Usuario demo</span>
          </div>
          
          <div className="avatar-circle">
            {usuario?.image ? (
              <img src={usuario.image} alt="Perfil" />
            ) : null}
          </div>

          {menuAbierto && (
            <div className="dropdown-menu">
              <div className="dropdown-item">Perfil</div>
              <div className="dropdown-item">Ajustes</div>
              <div className="dropdown-item" onClick={(e) => {
                e.stopPropagation();
                setMenuAbierto(false);
                setModalLogoutAbierto(true);
              }}>
                Cerrar sesión
              </div>
            </div>
          )}
        </div>
      </header>

      <Modal 
        isOpen={modalLogoutAbierto} 
        title="" 
        onClose={() => setModalLogoutAbierto(false)}
      >
        <div className="warning-icon-container">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="warning-icon">
            <path d="M12 2L1 21H23L12 2Z" fill="#e14040" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M12 9V14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="18" r="1.5" fill="#ffffff"/>
          </svg>
        </div>
        <div className="modal-text-center">
          <p>Esta por cerrar sesión</p>
          <br/>
          <p>¿Esta seguro de proceder con esta accion?</p>
        </div>
        <div className="modal-actions">
          <button onClick={confirmarCerrarSesion} className="btn-delete-modal">Sí, salir</button>
          <button onClick={() => setModalLogoutAbierto(false)} className="btn-secondary">Cancelar</button>
        </div>
      </Modal>
    </>
  );
}

export default Navbar;
