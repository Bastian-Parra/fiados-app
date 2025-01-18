import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import { createPurchase } from "../../api/purchases.js";

function CrearPurchaseModal({userId, onClose}) {
    const [show, setShow] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await createPurchase({...data, userId})
            alert("Fiado creado correctamente")
            onClose()
        } catch (error) {
            alert("Hubo un error al crear el fiado: " + error.message)
        }
    }

    return (
        <Modal show onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Fiado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="amount">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              type="number"
              {...register("amount", { required: "El monto es requerido" })}
              isInvalid={errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              {...register("description", { required: "La descripción es requerida" })}
              isInvalid={errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Crear
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    )
}

export default CrearPurchaseModal;

