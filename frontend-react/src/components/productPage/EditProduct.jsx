// src/components/EditProduct.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ProductTextField from './ProductTextField';
import ProductSelect from './ProductSelect';

const EditProduct = ({
  open,
  handleCloseEditDialog,
  editedProduct,
  handleEditInputChange,
  handleSaveEdit,
  kategoriaOptions,

}) => {

  const isFormValid = () => {
    return (
      editedProduct?.nazwa &&
      editedProduct?.kategoria &&
      editedProduct?.model &&
      editedProduct?.cena
    );
  };
  return (
    <Dialog open={open} onClose={handleCloseEditDialog}>
      <DialogTitle>Edytowanie produktu</DialogTitle>
      <DialogContent>
        <ProductTextField
          label="Nazwa"
          value={editedProduct?.nazwa || ''}
          onChange={(e) => handleEditInputChange('nazwa', e.target.value)}
        />

        <ProductSelect
          label="Kategoria"
          value={editedProduct?.kategoria || ''}
          onChange={(e) => handleEditInputChange('kategoria', e.target.value)}
          options={kategoriaOptions}
          id="kategoria-select"
        />

        <ProductTextField
          label="Model"
          value={editedProduct?.model || ''}
          onChange={(e) => handleEditInputChange('model', e.target.value)}
        />

        <ProductTextField
          label="Cena"
          value={editedProduct?.cena || ''}
          type="number"
          min={0}
          step="0.01"
          pattern="^[0-9]*(\\.[0-9]{0,2})?$"
          onChange={(e) => handleEditInputChange('cena', e.target.value)}
        />

        <ProductTextField
          label="ID zamówienia"
          value={editedProduct?.idZamowienia || ''}
          onChange={(e) => handleEditInputChange('idZamowienia', e.target.value)}
          type="number"
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

export default EditProduct;
