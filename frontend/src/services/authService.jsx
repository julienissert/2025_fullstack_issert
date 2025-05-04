import axios from 'axios';

const BACK_URL = 'http://localhost:3000';
const API_URL = `${BACK_URL}/api/auth`;

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erreur lors de la connexion';
  }
}

export async function registerUser(name, email, password) {
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de l\'inscription';
    }
  }