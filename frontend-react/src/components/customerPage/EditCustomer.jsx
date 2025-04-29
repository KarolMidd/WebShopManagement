// src/components/EditCustomer.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CustomerTextField from './CustomerTextField';

const EditCustomer = ({
  open,
  handleCloseEditDialog,
  editedCustomer,
  handleEditInputChange,
  handleSaveEdit,

}) => {

  const isFormValid = () => {
    return (
      editedCustomer?.imie &&
      editedCustomer?.nazwisko &&
      editedCustomer?.email &&
      editedCustomer?.ulica &&
      editedCustomer?.nrLokalu &&
      editedCustomer?.kodPocztowy &&
      editedCustomer?.miasto &&
      editedCustomer?.kodKraju &&
      editedCustomer?.telefon
    );
  };
  return (
    <Dialog open={open} onClose={handleCloseEditDialog}>
      <DialogTitle>Edytowanie klienta</DialogTitle>
      <DialogContent>
      <CustomerTextField
          label="Imię"
          value={editedCustomer?.imie || ''}
          onChange={(e) => handleEditInputChange('imie', e.target.value)}
        />

        <CustomerTextField
          label="Nazwisko"
          value={editedCustomer?.nazwisko || ''}
          onChange={(e) => handleEditInputChange('nazwisko', e.target.value)}
        />

        <CustomerTextField
          label="Email"
          value={editedCustomer?.email || ''}
          onChange={(e) => handleEditInputChange('email', e.target.value)}
        />

        <CustomerTextField
          label="Ulica"
          value={editedCustomer?.ulica || ''}
          onChange={(e) => handleEditInputChange('ulica', e.target.value)}
        />

        <CustomerTextField
          label="Nr lokalu"
          value={editedCustomer?.nrLokalu || ''}
          onChange={(e) => handleEditInputChange('nrLokalu', e.target.value)}
        />
        <CustomerTextField
          label="Miasto"
          value={editedCustomer?.miasto || ''}
          onChange={(e) => handleEditInputChange('miasto', e.target.value)}
        />
        <CustomerTextField
          label="Kod pocztowy"
          value={editedCustomer?.kodPocztowy || ''}
          onChange={(e) => handleEditInputChange('kodPocztowy', e.target.value)}
        />
        <CustomerTextField
          label="Kod kraju"
          value={editedCustomer?.kodKraju || ''}
          onChange={(e) => handleEditInputChange('kodKraju', e.target.value)}
        />
        <CustomerTextField
          label="telefon"
          value={editedCustomer?.telefon || ''}
          onChange={(e) => handleEditInputChange('telefon', e.target.value)}
          type='number'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditDialog} color="secondary">
          Anuluj
        </Button>
        <Button
          onClick={handleSaveEdit}
          color="primary"
          disabled={!isFormValid()} 
        >
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomer;
