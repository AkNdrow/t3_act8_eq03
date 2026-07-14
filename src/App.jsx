import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Almacenes from './pages/Almacenes';
import TareasCompletadas from './pages/TareasCompletadas';

function App() {
  const base = '/t3_act8_eq03';
  return (
    <BrowserRouter basename={base}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 Regresamos al validador por componente que lee el localStorage al montar la ruta */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="almacenes" element={<Almacenes />} />
            <Route path="tareas-completadas" element={<TareasCompletadas />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;