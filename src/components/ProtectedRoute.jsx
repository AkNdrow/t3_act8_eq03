import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const datosGuardados = window.localStorage.getItem('clevernote_user');
  const usuarioExistente = datosGuardados ? JSON.parse(datosGuardados) : null;

  // Si no tiene token válido en el localStorage, lo mandamos al login de forma relativa
  if (!usuarioExistente?.token) {
    return <Navigate to="/login" replace />;
  }

  // Si tiene sesión activa, renderiza las subrutas (DashboardLayout)
  return <Outlet />;
}

export default ProtectedRoute;