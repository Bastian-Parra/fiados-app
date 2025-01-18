import React from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../api/users";
import "../styles/CrearCliente.css"
import { useNavigate } from "react-router-dom";

function CrearCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        await createUser(data);
        alert("Cliente creado correctamente");
        navigate("/clientes");
    } catch (error) {
        alert("Hubo un error al crear el cliente: " + error.message);
    }
  };

  return (
    <div className="form-page">
      <h1>Crear Nuevo Cliente</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nombre del Cliente:</label>
          <input
            id="name"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "El correo es o obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El correo no es válido",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^\+?[0-9]{1,15}$/,
                message: "El teléfono no es válido",
              },
            })}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
}

export default CrearCliente;
