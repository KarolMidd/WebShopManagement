import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,} from '@mui/material';
import CustomerTextField from './CustomerTextField';

const AddCustomer = ({
  open,
  newCustomer,
  handleAddInputChange,
  handleSaveNewCustomer,
  handleCloseAddDialog,
}) => {
  const isFormValid = () => {
    return (
      newCustomer?.imie &&
      newCustomer?.nazwisko &&
      newCustomer?.email &&
      newCustomer?.ulica &&
      newCustomer?.nrLokalu &&
      newCustomer?.kodPocztowy &&
      newCustomer?.miasto &&
      newCustomer?.kodKraju &&
      newCustomer?.telefon
    );
  };

  return (
    <Dialog open={open} onClose={handleCloseAddDialog}>
      <DialogTitle>Dodawanie klienta</DialogTitle>
      <DialogContent>
        <CustomerTextField
          label="Imię"
          value={newCustomer?.imie || ''}
          onChange={(e) => handleAddInputChange('imie', e.target.value)}
        />

        <CustomerTextField
          label="Nazwisko"
          value={newCustomer?.nazwisko || ''}
          onChange={(e) => handleAddInputChange('nazwisko', e.target.value)}
        />

        <CustomerTextField
          label="Email"
          value={newCustomer?.email || ''}
          onChange={(e) => handleAddInputChange('email', e.target.value)}
        />

        <CustomerTextField
          label="Ulica"
          value={newCustomer?.ulica || ''}
          onChange={(e) => handleAddInputChange('ulica', e.target.value)}
        />

        <CustomerTextField
          label="Nr lokalu"
          value={newCustomer?.nrLokalu || ''}
          onChange={(e) => handleAddInputChange('nrLokalu', e.target.value)}
        />
        <CustomerTextField
          label="Miasto"
          value={newCustomer?.miasto || ''}
          onChange={(e) => handleAddInputChange('miasto', e.target.value)}
        />
        <CustomerTextField
          label="Kod pocztowy"
          value={newCustomer?.kodPocztowy || ''}
          onChange={(e) => handleAddInputChange('kodPocztowy', e.target.value)}
        />
        <CustomerTextField
          label="Kod kraju"
          value={newCustomer?.kodKraju || ''}
          onChange={(e) => handleAddInputChange('kodKraju', e.target.value)}
        />
        <CustomerTextField
          label="telefon"
          value={newCustomer?.telefon || ''}
          onChange={(e) => handleAddInputChange('telefon', e.target.value)}
          type='number'
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAddDialog} color="secondary">
          Anuluj
        </Button>
        <Button
          onClick={handleSaveNewCustomer}
          color="primary"
          disabled={!isFormValid()} 
        >
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomer;
