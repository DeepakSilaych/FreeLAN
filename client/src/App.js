import React from 'react';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Login from './pages/Login';
// import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/project/:projectId" element={<Layout><Project /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
        </Routes>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;
