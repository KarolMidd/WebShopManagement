// src/components/FilterTextField.js
import React from 'react';
import { TextField } from '@mui/material';

const OrderTextField = ({ label, value, onChange, type = 'text', min,max, step, pattern, shrink}) => {
  return (
    <TextField
      variant="outlined"
      margin="dense"
      label={label}
      fullWidth
      type={type}
      value={value}
      onChange={onChange}
      slotProps={{
        input: {
          min: {min},
          step,
          max: {max},
          pattern,
          inputMode: type === 'number' ? 'decimal' : 'text',
        },
        inputLabel: {
          shrink,
        }
      }}
    />
  );
};

export default OrderTextField;
