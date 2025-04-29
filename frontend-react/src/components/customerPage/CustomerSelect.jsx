// src/components/FilterSelect.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomerSelect = ({ label, value, onChange, options, id}) => {
  return (
    <FormControl fullWidth variant="outlined" margin="dense">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        id={id}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomerSelect;