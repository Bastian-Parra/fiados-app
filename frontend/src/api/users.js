import instance from "./axios"

export const createUser = user => instance.post('/api/users/create', user)
export const getAllUsers = () => instance.get('/api/users/getAllUsers')
export const getById = (id) => instance.get(`/api/users/getById/${id}`)
export const updateUser = (id, user) => instance.put(`/api/users/update/${id}`, user)
export const deleteUser = (id) => instance.delete(`/api/users/delete/${id}`)
export const getBalance = (id) => instance.get(`/api/users/balance/${id}`)
export const getHistory = (id) => instance.get(`/api/users/history/${id}`)
export const deleteUserHistory = (id) => instance.delete(`/api/users/history-delete/${id}`)