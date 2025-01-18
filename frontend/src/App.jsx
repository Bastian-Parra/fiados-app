import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// PAGES ===================== 
import ClientesPage from './pages/ClientesPage.jsx'
import Header from './components/Header.jsx'
import ClienteDetail from "./pages/ClienteDetail.jsx"
import CrearCliente from "./pages/CrearCliente.jsx"

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/clientes" />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/clientes/:id" element={<ClienteDetail />} />
        <Route path="/clientes/crear" element={<CrearCliente />} />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </div>
  );
}

export default App;
