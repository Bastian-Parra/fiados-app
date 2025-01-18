import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../../api/users.js";

function EliminarModal({ userId, onClose, onDeleteSuccess}) {
  // Función para manejar la eliminación
  const onSubmit = async () => {
    try {
      await deleteUser(userId); 
      onDeleteSuccess(userId)
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("Hubo un error al eliminar el usuario. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <Modal show onHide={onClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Está seguro de que desea eliminar este cliente?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EliminarModal;
