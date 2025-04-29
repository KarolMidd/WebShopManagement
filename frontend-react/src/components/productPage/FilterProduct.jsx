// src/components/FilterProduct.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ProductTextField from './ProductTextField';
import ProductSelect from './ProductSelect';

const FilterProduct = ({
  open,
  handleClose,
  tempFilter,
  handleFilterInputChange,
  handleFilterEdit,
  kategoriaOptions
}) => {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Wyszukiwanie produktów</DialogTitle>
      <DialogContent>
        <ProductTextField
          label="Nazwa"
          value={tempFilter?.nazwa || ''}
          onChange={(e) => handleFilterInputChange('nazwa', e.target.value)}
        />

        <ProductSelect
          label="Kategoria"
          value={tempFilter?.kategoria || ''}
          onChange={(e) => handleFilterInputChange('kategoria', e.target.value)}
          options={kategoriaOptions}
          id="kategoria-select"
        />

        <ProductTextField
          label="Model"
          value={tempFilter?.model || ''}
          onChange={(e) => handleFilterInputChange('model', e.target.value)}
        />

        <ProductTextField
          label="Kwota minimalna"
          value={tempFilter?.minCena || ''}
          type="number"
          min={0}
          step="0.01"
          pattern="^[0-9]*(\\.[0-9]{0,2})?$"
          onChange={(e) => handleFilterInputChange('minCena', e.target.value)}
        />

        <ProductTextField
          label="Kwota maksymalna"
          value={tempFilter?.maxCena || ''}
          type="number"
          min={0}
          step="0.01"
          pattern="^[0-9]*(\\.[0-9]{0,2})?$"
          onChange={(e) => handleFilterInputChange('maxCena', e.target.value)}
        />

        <ProductTextField
          label="ID zamówienia"
          value={tempFilter?.idZamowienia || ''}
          onChange={(e) => handleFilterInputChange('idZamowienia', e.target.value)}
          type="number"
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

export default FilterProduct;
