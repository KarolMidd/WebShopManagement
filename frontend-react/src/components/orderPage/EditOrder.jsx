// src/components/EditOrder.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import OrderTextField from './OrderTextField';
import SelectOrder from './SelectOrder';

const EditOrder = ({
  open,
  handleCloseEditDialog,
  editedOrder,
  handleEditInputChange,
  handleSaveEdit,
  statusOptions,
  deliveryOptions,
  paymentOptions
}) => {
  const isFormValid = () => {
    return (
      editedOrder?.idKlienta &&
      editedOrder?.status &&
      editedOrder?.dataZlozenia &&
      editedOrder?.kwotaCalkowita &&
      editedOrder?.dostawa &&
      editedOrder?.platnosc &&
      (editedOrder?.oplacone === true || editedOrder?.oplacone === false)
    );
  };
  return (
    <Dialog open={open} onClose={handleCloseEditDialog}>
      <DialogTitle>Edytowanie zamówienia</DialogTitle>
      <DialogContent>
        <OrderTextField
          label="ID Klienta"
          value={editedOrder?.idKlienta || ''}
          onChange={(e) => handleEditInputChange('idKlienta', e.target.value)}
          type="number"
        />

        <SelectOrder
          label="Status"
          value={editedOrder?.status || ''}
          onChange={(e) => handleEditInputChange('status', e.target.value)}
          options={statusOptions}
          id="status-select"
        />

        <OrderTextField
          label="Data złożenia"
          value={editedOrder?.dataZlozenia || ''}
          type="datetime-local"
          onChange={(e) => handleEditInputChange('dataZlozenia', e.target.value)}
          shrink={true}
        />

        <OrderTextField
          label="Kwota całkowita"
          value={editedOrder?.kwotaCalkowita || ''}
          type="number"
          min={0}
          step="0.01"
          pattern="^[0-9]*(\\.[0-9]{0,2})?$"
          onChange={(e) => handleEditInputChange('kwotaCalkowita', e.target.value)}
        />


        <SelectOrder
          label="Dostawa"
          value={editedOrder?.dostawa || ''}
          onChange={(e) => handleEditInputChange('dostawa', e.target.value)}
          options={deliveryOptions}
          id="dostawa-select"
        />

        <SelectOrder
          label="Płatność"
          value={editedOrder?.platnosc || ''}
          onChange={(e) => handleEditInputChange('platnosc', e.target.value)}
          options={paymentOptions}
          id="platnosc-select"
        />

        <SelectOrder
          label="Opłacone"
          value={editedOrder?.oplacone === undefined ? '' : editedOrder?.oplacone ? 'Tak' : 'Nie'}
          onChange={(e) => handleEditInputChange('oplacone', e.target.value === 'Tak')}
          options={['Tak', 'Nie']}
          id="oplacone-select"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditDialog} color="secondary">
          Anuluj
        </Button>
        <Button onClick={handleSaveEdit} color="primary" disabled={!isFormValid()}>
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrder;
