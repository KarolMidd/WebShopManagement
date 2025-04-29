import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,} from '@mui/material';
import ProductTextField from './ProductTextField';
import ProductSelect from './ProductSelect';

const AddProduct = ({
  open,
  newProduct,
  handleAddInputChange,
  handleSaveNewProduct,
  handleCloseAddDialog,
  kategoriaOptions,
}) => {
  const isFormValid = () => {
    return (
      newProduct?.nazwa &&
      newProduct?.kategoria &&
      newProduct?.model &&
      newProduct?.cena
    );
  };

  return (
    <Dialog open={open} onClose={handleCloseAddDialog}>
      <DialogTitle>Dodawanie produktu</DialogTitle>
      <DialogContent>
        <ProductTextField
          label="Nazwa"
          value={newProduct?.nazwa || ''}
          onChange={(e) => handleAddInputChange('nazwa', e.target.value)}
        />

        <ProductSelect
          label="Kategoria"
          value={newProduct?.kategoria || ''}
          onChange={(e) => handleAddInputChange('kategoria', e.target.value)}
          options={kategoriaOptions}
          id="kategoria-select"
        />

        <ProductTextField
          label="Model"
          value={newProduct?.model || ''}
          onChange={(e) => handleAddInputChange('model', e.target.value)}
        />

        <ProductTextField
          label="Cena"
          value={newProduct?.cena || ''}
          type="number"
          min={0}
          step="0.01"
          pattern="^[0-9]*(\\.[0-9]{0,2})?$"
          onChange={(e) => handleAddInputChange('cena', e.target.value)}
        />

        <ProductTextField
          label="ID zamówienia"
          value={newProduct?.idZamowienia || ''}
          onChange={(e) => handleAddInputChange('idZamowienia', e.target.value)}
          type="number"
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAddDialog} color="secondary">
          Anuluj
        </Button>
        <Button
          onClick={handleSaveNewProduct}
          color="primary"
          disabled={!isFormValid()} 
        >
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;
