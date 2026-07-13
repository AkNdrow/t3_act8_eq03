import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const obtenerEstilo = ({ isActive }) => ({
    display: 'block',
    padding: '10px 15px',
    color: isActive ? '#007bff' : '#333',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? '#e6f2ff' : 'transparent',
    borderRadius: '4px',
    marginBottom: '5px'
  });

  return (
    <aside style={{ width: '240px', borderRight: '1px solid #ddd', padding: '20px', backgroundColor: '#fff' }}>
      <h3 style={{ marginBottom: '30px', color: '#007bff', marginTop: 0 }}>CleverNote</h3>
      <nav>
        <NavLink to="/dashboard" end style={obtenerEstilo}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/dashboard/almacenes" style={obtenerEstilo}>
          📦 Almacenes
        </NavLink>
        <NavLink to="/dashboard/tareas-completadas" style={obtenerEstilo}>
          ✅ Tareas Completadas
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;