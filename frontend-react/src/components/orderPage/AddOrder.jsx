import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,} from '@mui/material';
import OrderTextField from './OrderTextField';
import OrderSelect from './SelectOrder';

const AddOrder = ({
  open,
  newOrder,
  handleAddInputChange,
  handleSaveNewOrder,
  handleCloseAddDialog,
  statusOptions,
  deliveryOptions,
  paymentOptions
}) => {
  const isFormValid = () => {
    return (
      newOrder?.idKlienta &&
      newOrder?.status &&
      newOrder?.dataZlozenia &&
      newOrder?.kwotaCalkowita &&
      newOrder?.dostawa &&
      newOrder?.platnosc &&
      (newOrder?.oplacone === true || newOrder?.oplacone === false)
    );
  };


  return (
    <Dialog open={open} onClose={handleCloseAddDialog}>
      <DialogTitle>Dodawanie zamówienia</DialogTitle>
      <DialogContent>
        <OrderTextField
          label="ID Klienta"
          value={newOrder?.idKlienta || ''}
          onChange={(e) => handleAddInputChange('idKlienta', e.target.value)}
          type="number"
        />

        <OrderSelect
          label="Status"
          value={newOrder?.status || ''}
          onChange={(e) => handleAddInputChange('status', e.target.value)}
          options={statusOptions}
          id="status-select"
        />

        <OrderTextField
          label="Data złożenia"
          value={newOrder?.dataZlozenia || ''}
          type="datetime-local"
          onChange={(e) => handleAddInputChange('dataZlozenia', e.target.value)}
          shrink={true}
          min="1900-01-01T00:00"
          max="2100-12-31T23:59"
        />

        <OrderTextField
          label="Kwota całkowita"
          value={newOrder?.kwotaCalkowita || ''}
          type="number"
          min={0}
          step="0.01"
          pattern="^[0-9]*(\\.[0-9]{0,2})?$"
          onChange={(e) => handleAddInputChange('kwotaCalkowita', e.target.value)}
        />

        <OrderSelect
          label="Dostawa"
          value={newOrder?.dostawa || ''}
          onChange={(e) => handleAddInputChange('dostawa', e.target.value)}
          options={deliveryOptions}
          id="dostawa-select"
        />

        <OrderSelect
          label="Płatność"
          value={newOrder?.platnosc || ''}
          onChange={(e) => handleAddInputChange('platnosc', e.target.value)}
          options={paymentOptions}
          id="platnosc-select"
        />

        <OrderSelect
          label="Opłacone"
          value={newOrder?.oplacone === null || newOrder?.oplacone === undefined ? '' : newOrder?.oplacone ? 'Tak' : 'Nie'}
          onChange={(e) => handleAddInputChange('oplacone', e.target.value === 'Tak')}
          options={['Tak', 'Nie']}
          id="oplacone-select"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAddDialog} color="secondary">
          Anuluj
        </Button>
        <Button
          onClick={handleSaveNewOrder}
          color="primary"
          disabled={!isFormValid()} // Przycisk "Zapisz" jest aktywny tylko, gdy wszystkie pola są wypełnione
        >
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrder;
