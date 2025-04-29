// src/components/FilterCustomer.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CustomerTextField from './CustomerTextField';
import CustomerSelect from './CustomerSelect';

const FilterCustomer = ({
  open,
  handleClose,
  tempFilter,
  handleFilterInputChange,
  handleFilterEdit,
}) => {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Wyszukiwanie klientów</DialogTitle>
      <DialogContent>
      <CustomerTextField
          label="Imię"
          value={tempFilter?.imie || ''}
          onChange={(e) => handleFilterInputChange('imie', e.target.value)}
        />

        <CustomerTextField
          label="Nazwisko"
          value={tempFilter?.nazwisko || ''}
          onChange={(e) => handleFilterInputChange('nazwisko', e.target.value)}
        />

        <CustomerTextField
          label="Email"
          value={tempFilter?.email || ''}
          onChange={(e) => handleFilterInputChange('email', e.target.value)}
        />

        <CustomerTextField
          label="Ulica"
          value={tempFilter?.ulica || ''}
          onChange={(e) => handleFilterInputChange('ulica', e.target.value)}
        />

        <CustomerTextField
          label="Nr lokalu"
          value={tempFilter?.nrLokalu || ''}
          onChange={(e) => handleFilterInputChange('nrLokalu', e.target.value)}
        />
        <CustomerTextField
          label="Miasto"
          value={tempFilter?.miasto || ''}
          onChange={(e) => handleFilterInputChange('miasto', e.target.value)}
        />
        <CustomerTextField
          label="Kod pocztowy"
          value={tempFilter?.kodPocztowy || ''}
          onChange={(e) => handleFilterInputChange('kodPocztowy', e.target.value)}
        />
        <CustomerTextField
          label="Kod kraju"
          value={tempFilter?.kodKraju || ''}
          onChange={(e) => handleFilterInputChange('kodKraju', e.target.value)}
        />
        <CustomerTextField
          label="telefon"
          value={tempFilter?.telefon || ''}
          onChange={(e) => handleFilterInputChange('telefon', e.target.value)}
          type='number'
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Anuluj
        </Button>
        <Button
          onClick={handleFilterEdit}
          color="primary"
        >
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterCustomer;
