import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import AuthProvider from './context/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/buscador-usuarios"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/buscador-usuarios?pagina=1" replace />} />
        <Route path="*" element={<Navigate to="/buscador-usuarios?pagina=1" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)