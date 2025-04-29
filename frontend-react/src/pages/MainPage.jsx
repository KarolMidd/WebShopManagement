import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom'; 
import { Typography, Drawer, List, Divider, Button, Box } from '@mui/material';

const MainPage = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Token before removal:", localStorage.getItem("authToken"));
    localStorage.removeItem('authToken');
    console.log("Token after removal:", localStorage.getItem("authToken"));
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
          display: 'flex',
          flexDirection: 'column',
        }}
        variant="permanent"
        anchor="left"
      >
        <div>
          <Typography variant="h6" style={{ padding: '16px', fontWeight: 'bold' }}>
            Panel zarządzania
          </Typography>
          <Divider />
          <List>
            <Button
              fullWidth
              component={Link}
              to="/orders"
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                padding: '10px 16px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              Zamówienia
            </Button>
            <Button
              fullWidth
              component={Link}
              to="/customers"
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                padding: '10px 16px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              Klienci
            </Button>
            <Button
              fullWidth
              component={Link}
              to="/products"
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                padding: '10px 16px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              Produkty
            </Button>
          </List>
        </div>

    
        <Box sx={{ flexGrow: 1 }} />
        <Button
          fullWidth
          onClick={handleLogout}
          sx={{
            justifyContent: 'center',
            textTransform: 'none',
            padding: '12px',
            backgroundColor: '#d32f2f',
            color: 'white',
            borderRadius: '0',
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          Wyloguj
        </Button>
      </Drawer>

      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
