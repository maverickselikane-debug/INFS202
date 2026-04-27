import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import List from './pages/List';
import Details from './pages/Details';
import AddStudent from './pages/AddStudent';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// This component protects routes that need login
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  // If no token, send to login page
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - no login needed */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes - login required */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Navbar />
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/list"
          element={
            <PrivateRoute>
              <Navbar />
              <List />
            </PrivateRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <Details />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <Navbar />
              <AddStudent />
            </PrivateRoute>
          }
        />

        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
