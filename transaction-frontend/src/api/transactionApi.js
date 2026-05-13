import axios from 'axios';

const API_URL = 'http://localhost:8080/api/transactions';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllTransactions = () => api.get('');
export const getTransactionById = (id) => api.get(`/${id}`);
export const createTransaction = (data) => api.post('', data);
export const updateTransaction = (id, data) => api.put(`/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/${id}`);