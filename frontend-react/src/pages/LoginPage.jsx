import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/LoginPage.css'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      setError('Błąd logowania. Sprawdź dane i spróbuj ponownie.');
      console.error('Błąd logowania:', error.response?.data || error.message);
      setPassword('');
      setUsername('');
    }
  };

  return (
      <div className="container">
        <div className="form-wrapper">
          <h2 className="title">Logowanie</h2>
          {error && <p className="error-message">{error}</p>}
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Nazwa użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">Zaloguj</button>
          </form>
        </div>
      </div>
  );
};

export default LoginPage;
