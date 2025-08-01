// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  FACTURAS: `${API_BASE_URL}/facturas`,
};

export { API_BASE_URL };
