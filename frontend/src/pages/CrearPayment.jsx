import React from "react"
import { useForm } from "react-hook-form"
import { createPayment } from "../api/payments"

import "../styles/CrearPayment.css"

function CrearPayment() {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const onSubmit = (data) => {
        createPayment(data)
        console.log(data)
    }
    
    return (
        <div className="crea-payment-page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="amount">Monto:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        {...register("amount", {
                            required: "El monto es obligatorio",
                            min: { value: 1, message: "El monto debe ser mayor a 0" },
                        })}
                    />
                    {errors.amount && <p>{errors.amount.message}</p>}
                </div>
            </form>

        </div>
    )
}

export default CrearPayment