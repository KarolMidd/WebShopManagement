// src/components/FilterOrder.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import OrderTextField from './OrderTextField';
import SelectOrder from './SelectOrder';

const FilterOrder = ({
  open,
  handleClose,
  tempFilter,
  handleFilterInputChange,
  handleFilterEdit,
  statusOptions,
  deliveryOptions,
  paymentOptions
}) => {
  
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Wyszukiwanie zamówień</DialogTitle>
      <DialogContent>
        <OrderTextField
          label="ID Klienta"
          value={tempFilter?.idKlienta || ''}
          onChange={(e) => handleFilterInputChange('idKlienta', e.target.value)}
          type="number"
        />

        <SelectOrder
          label="Status"
          value={tempFilter?.status || ''}
          onChange={(e) => handleFilterInputChange('status', e.target.value)}
          options={statusOptions}
          id="status-select"
        />

        <OrderTextField
          label="Początkowa Data"
          value={tempFilter?.startDate || ''}
          type="datetime-local"
          onChange={(e) => handleFilterInputChange('startDate', e.target.value)}
          shrink={true}
        />

        <OrderTextField
          label="Końcowa Data"
          value={tempFilter?.endDate || ''}
          type="datetime-local"
          onChange={(e) => handleFilterInputChange('endDate', e.target.value)}
          shrink={true}
        />

        <OrderTextField
          label="Kwota Minimalna"
          value={tempFilter?.minCena || ''}
          type="number"
          min={0}
          step="0.01"
          pattern="^[0-9]*(\\.[0-9]{0,2})?$"
          onChange={(e) => handleFilterInputChange('minCena', e.target.value)}
        />

        <OrderTextField
          label="Kwota Maksymalna"
          value={tempFilter?.maxCena || ''}
          type="number"
          min={0}
          step="0.01"
          pattern="^[0-9]*(\\.[0-9]{0,2})?$"
          onChange={(e) => handleFilterInputChange('maxCena', e.target.value)}
        />

        <SelectOrder
          label="Dostawa"
          value={tempFilter?.dostawa || ''}
          onChange={(e) => handleFilterInputChange('dostawa', e.target.value)}
          options={deliveryOptions}
          id="dostawa-select"
        />

        <SelectOrder
          label="Płatność"
          value={tempFilter?.platnosc || ''}
          onChange={(e) => handleFilterInputChange('platnosc', e.target.value)}
          options={paymentOptions}
          id="platnosc-select"
        />

        <SelectOrder
          label="Opłacone"
          value={tempFilter?.oplacone === undefined ? '' : tempFilter?.oplacone ? 'Tak' : 'Nie'}
          onChange={(e) => handleFilterInputChange('oplacone', e.target.value === 'Tak')}
          options={['Tak', 'Nie']}
          id="oplacone-select"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Anuluj
        </Button>
        <Button onClick={handleFilterEdit} color="primary">
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterOrder;
