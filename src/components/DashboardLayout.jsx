import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ padding: '30px', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;