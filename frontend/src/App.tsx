import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DonorList from './pages/DonorList';
import DonationList from './pages/DonationList';
import CenterList from './pages/CenterList';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { token, loading } = useAuth();
    
    if (loading) return <div className="min-h-screen grid place-items-center font-display font-bold text-blood-600 animate-pulse">Chargement HemoFlow...</div>;
    if (!token) return <Navigate to="/login" />;
    
    return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="donors" element={<DonorList />} />
                    <Route path="donations" element={<DonationList />} />
                    <Route path="centers" element={<CenterList />} />
                    <Route path="" element={<Navigate to="dashboard" />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
