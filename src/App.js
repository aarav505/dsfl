import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Players from './pages/Players';
import MyTeam from './pages/MyTeam';
import CreateTeam from './pages/CreateTeam';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/players" 
                element={
                  <ProtectedRoute>
                    <Players />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-team" 
                element={
                  <ProtectedRoute>
                    <MyTeam />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-team" 
                element={
                  <ProtectedRoute>
                    <CreateTeam />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;