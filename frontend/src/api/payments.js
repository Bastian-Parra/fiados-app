import instance from "./axios.js"

export const createPayment = payment => instance.post(`/api/payments/create`, payment)
export const getAllPayments = () => instance.get('/api/payments/getAll')
export const deletePayment = (id) => instance.delete(`/api/payments/${id}`)

