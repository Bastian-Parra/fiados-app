import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ClientesPage.css";
import CrearPurchaseModal from "../components/modals/CrearPurchaseModal.jsx";
import EliminarModal from "../components/modals/EliminarModal.jsx";
import {
  getAllUsers,
  deleteUser,
} from "../api/users.js";

import { MoneyIcon } from "../components/icons/MoneyIcon.jsx";
import { DeleteIcon } from "../components/icons/DeleteIcon.jsx";
import { AddIcon } from "../components/icons/AddIcon.jsx";

function ClientesPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [showEliminarModal, setShowEliminarModal] = useState(false)
  const [showCrearPurchaseModal, setShowCrearPurchaseModal] = useState(false)
  const [reload, setReload] = useState(false)

  const handleOpenEliminarModal = (userId) => {
    setSelectedUserId(userId)
    setShowEliminarModal(true)
  }

  const handleCloseEliminarModal = () => {
    setShowEliminarModal(false)
    setSelectedUserId(null)
  }

  const handleOpenCrearPurchaseModal = (userId) => {
    setSelectedUserId(userId)
    setShowCrearPurchaseModal(true)
  }

  const handleCloseCrearPurchaseModal = () => {
    setShowCrearPurchaseModal(false)
    setSelectedUserId(null)
  }

  const handleReload = () => setReload((prev) => !prev)

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await getAllUsers();
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reload]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!users) return <p>No hay usuarios</p>;

  return (
    <div className="clientes-page">
      <div className="clientes-page-header">
        <h1>Lista de Clientes</h1>

        <button
          className="btn-add-cliente"
          onClick={() => navigate("/clientes/crear")}
        >
          <AddIcon /> Agregar Cliente
        </button>
      </div>
      <table className="tabla-clientes">
        <thead>
          <tr>
            <th className="medium-column">Nombre</th>
            <th className="narrow-column">Celular</th>
            <th className="wide-column">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    className="btn-action add"
                    onClick={() => handleOpenCrearPurchaseModal(user.id)}
                  >
                    <AddIcon /> Agregar Fiado
                  </button>
                  <button
                    className="btn-action view"
                    onClick={() => navigate(`/clientes/${user.id}`)}
                  >
                    <MoneyIcon /> Ver Saldo
                  </button>
                  <button
                    className="btn-action delete"
                    onClick={() => handleOpenEliminarModal(user.id)}
                  >
                    <DeleteIcon /> Borrar Cliente
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showCrearPurchaseModal && (
        <CrearPurchaseModal
          userId={selectedUserId}
          onClose={handleCloseCrearPurchaseModal}
        />
      )}

      {showEliminarModal && (
        <EliminarModal
          userId={selectedUserId}
          onClose={() => {
            handleCloseEliminarModal();
            handleReload();
          }}
        />
      )}
    </div>
  );
}

export default ClientesPage;
