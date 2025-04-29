import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; 
        if (expirationTime < Date.now()) {
          navigate('/login');
        }
      } catch (error) {     
        navigate('/login');
      }
    }
  }, [navigate]);

  return <>{children}</>; 
};

export default ProtectedRoute;
