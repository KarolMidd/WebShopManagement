import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const login = async (username, password) => {
    const response = await axios.post('http://localhost:8080/auth/login', { username, password });
    const token = response.data.token;
    localStorage.setItem('authToken', token);
    return token;
  };
  

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};
