import instance from "./axios.js"

export const createPurchase = (purchase) => instance.post('/api/purchases/create', purchase)
export const getAllPurchases = () => instance.get('/api/purchases/getAll')
export const deletePurchase = (id) => instance.delete(`api/purchases/${id}`)
