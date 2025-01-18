import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import { createPayment } from "../../api/payments.js";

function CrearPaymentModal({userId, onClose}) {
    const [show, setShow] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await createPayment({...data, userId})
            alert("Pago creado correctamente")
            onClose()
        } catch (error) {
            alert("Hubo un error al crear el pago: " + error.message)
        }
    }

    return (
        <Modal show onHide={onClose} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Crear Nuevo Abono</Modal.Title>
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

export default CrearPaymentModal
