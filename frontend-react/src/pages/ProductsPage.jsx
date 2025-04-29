import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../services/authService'; 
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Checkbox, 
  IconButton, Button, Paper,
} from '@mui/material';
import { Edit, Delete, Add, Search, SearchOff} from '@mui/icons-material';
import FilterDialog from '../components/productPage/FilterProduct';
import AddDialog from '../components/productPage/AddProduct';
import EditDialog from '../components/productPage/EditProduct';
import ErrorDialog from '../components/productPage/ErrorProduct';

const BoldTableCell = ({children, ...props}) => (
  <TableCell sx={{fontWeight: 'bold'}} {...props}>
    {children}
  </TableCell>
);

const ProductsPage = () => {

// SELEKTORY
const [products, setProducts] = useState([]);
const [selectedProducts, setSelectedProducts] = useState([]); 

// ERORRY
const [error, setError] = useState('');
const [openErrorDialog, setOpenErrorDialog] = useState(false);

const [errorInfo, setErrorInfo] = useState({
  status: null,
  data: null,
});

// PAGINACJA
const [page, setPage] = useState(0);
const [totalElements, setTotalElements] = useState(0);

// EDYCJA
const [openEditDialog, setOpenEditDialog] = useState(false); 
const [editedProduct, setEditedProduct] = useState(null); 

// DODAWANIE
const [openAddDialog, setOpenAddDialog] = useState(false);
const initialNewProductState = {
  nazwa: '',
  kategoria: '',
  model: '',
  cena: '',
  idZamowienia: '',
};
const [newProduct, setNewProduct] = useState(initialNewProductState);

// FILTER
const [newFilter, setNewFilter] = useState(null);
const [openFilterDialog, setOpenFilterDialog] = useState(false);
const [tempFilter, setTempFilter] = useState(null);

const kategoriaOptions = [
  "Ekspresy do kawy",
  "Klimatyzatory",
  "Kuchnie",
  "Lodówki",
  "Mikrofale",
  "Narzędzia",
  "Odkurzacze",
  "Piekarniki",
  "Pralki",
  "Suszarki",
  "Telewizory",
  "Zmywarki"
];


useEffect(() => {
  const fetchFilteredOrAllProducts = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        newFilter ? 'http://localhost:8080/products/filter' : 'http://localhost:8080/products',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ...(newFilter || {}), 
            page: page,
            size: 25,
          },
        }
      );

      setProducts(response.data.content);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      handleError(error);
    }
  };

  fetchFilteredOrAllProducts();
}, [page, newFilter]);
// ------------------------ ERRORY ------------------

const handleCloseErrorDialog = () =>
{
  setOpenErrorDialog(false);
}

const handleError = (error) =>
{
  setErrorInfo({
    status: error.response?.status,
    data: error.response?.data,
  });
  setOpenErrorDialog(true);
}

// --------------------------- EDIT  --------------------------- 
const handleEdit = (productId) => {
  const productToEdit = products.find(product => product.id === productId); 
  if (productToEdit) {
    setEditedProduct({ ...productToEdit }); 
    setOpenEditDialog(true); 
  }
};

const handleCloseEditDialog = () => {
  setOpenEditDialog(false);
  setEditedProduct(null); 
};

const handleEditInputChange = (field, value) => {
  setEditedProduct({
    ...editedProduct,
    [field]: value, 
  });
};

const handleSaveEdit = async () => {
  try {
    const token = getToken();
    const response = await axios.put(`http://localhost:8080/products/${editedProduct.id}`, editedProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(products.map(product => (product.id === editedProduct.id ? response.data : product)));
    setOpenEditDialog(false);
    setEditedProduct(null);
  } catch (error) {
    handleError(error);
  }
};

//  --------------------------- ZMIANA STRONY ----------------------------------------------
const handlePageChange = (event, newPage) => {
  setPage(newPage); 
};

// ------------------------ WYLOGOWANIE

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};


// -------------------------- SELECTORY --------------------------------------------------

const handleSelectProduct = (productId) => {
  const newSelectedProducts = selectedProducts.includes(productId)
    ? selectedProducts.filter(id => id !== productId) 
    : [...selectedProducts, productId]; 
  setSelectedProducts(newSelectedProducts);
};


const handleSelectAll = () => {
  if (selectedProducts.length === products.length) {
    setSelectedProducts([]); 
  } else {
    setSelectedProducts(products.map(product => product.id)); 
  }
};

const handleDeleteSelectedList = () => {
  setSelectedProducts([]);
}

// ----------------------- USUWANIE  -------------------------------------------------

const updatePageAfterDelete = async (products, setProducts, setPage, setTotalElements, page, selectedProducts) => {
  if (products.length < 25) {
    const nextPage = page + 1;

    try {
      const token = getToken();
      const response = await axios.get('http://localhost:8080/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: nextPage,
          size: 25,
        },
      });

      const newProducts = response.data.content.filter(
        (product) => !products.some((p) => p.id === product.id)
      );

      setProducts([...products, ...newProducts]);

      if (products.length === 0 && page > 0) {
        setPage(page - 1);
      }
    } catch (error) {
      handleError(error);
    }
  }
  setTotalElements((prev) => prev - (selectedProducts ? selectedProducts.length : 1));
};



const handleDeleteSelected = async () => {
  try {
    const token = getToken();
    await axios.delete('http://localhost:8080/products/batch', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: selectedProducts,
    });

    const updatedProducts = products.filter(product => !selectedProducts.includes(product.id));
    setProducts(updatedProducts);
    setSelectedProducts([]);

    updatePageAfterDelete(updatedProducts, setProducts, setPage, setTotalElements, page, selectedProducts);

  } catch (error) {
    handleError(error);
  }
};


const handleDeleteProduct = async (productId) => {
  console.log("Product to delete ID:", productId); 
  
  try {
    const token = getToken();
    console.log("Token:", token); 

    await axios.delete(`http://localhost:8080/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    const updatedProducts = products.filter(product => product.id !== productId);

    setProducts(updatedProducts);
    console.log("State after setProducts:", updatedProducts);

    updatePageAfterDelete(updatedProducts, setProducts, setPage, setTotalElements, page, null);

  } catch (error) {
    console.error("Error deleting product:", error);
    handleError(error);
  }
};



//------------------------------------------------ DODAWANIE --------------------------------------------------------

const handleAdd = () => {
  setNewProduct(initialNewProductState);
  setOpenAddDialog(true);
};

const handleCloseAddDialog = () => {
  setOpenAddDialog(false);
};

const handleSaveNewProduct = async () => {
  try {
    const response = await axios.post('http://localhost:8080/products', newProduct, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`, 
      },
    });

    setProducts([...products, response.data]);
    setTotalElements((prevTotal) => prevTotal + 1);
    setOpenAddDialog(false); 
  } catch (error) {
    handleError(error);
  }
};

const handleAddInputChange = (field, value) => {
  setNewProduct({
    ...newProduct,
    [field]: value, 
  });
};

// ----------------------------------------------- WYSZUKIWANIE PO FILTRZE -----------------------------------------
const handleDeleteFilter = () => {
  setNewFilter({});
  setPage(0);
}

const handleFilter = () => {
  setTempFilter(newFilter || {});
  setOpenFilterDialog(true);
}

const handleCloseFilterDialog = () => {
  setOpenFilterDialog(false);
}

const handleFilterInputChange = (field, value) => {
  setTempFilter({
    ...tempFilter,
    [field]: value,
  });
};

const handleFilterEdit = async () => {
  try {
    setNewFilter(tempFilter);
    setOpenFilterDialog(false);

    const token = getToken(); 
    const response = await axios.get('http://localhost:8080/products/filter', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      params: {
        ...newFilter,
        page: 0,
        size: 25, 
      },
    });

    setProducts(response.data.content); 
    setTotalElements(response.data.totalElements);
    setPage(0);
  } catch (error) {
    handleError(error);
  }
};

  return (
    <div aria-hidden="false">
      <h1>Produkty</h1>
      {error && <p>{error}</p>}

      <Button variant="contained"  
              sx={{ backgroundColor: 'green' }}
              onClick={handleAdd} 
              startIcon={<Add />}
            >
        Dodaj produkt
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: 'red' , '&:hover':{ background: '#8f031d' }}}
        startIcon={<Delete />}
        onClick={handleDeleteSelected}
        disabled={selectedProducts.length === 0} 
      >
        USUŃ
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: 'orange' , '&:hover':{ background: '#f5c84c' }}}
        startIcon={<Search/>}
        onClick={handleFilter}     
      >
        WYSZUKAJ
      </Button>

      {newFilter && Object.keys(newFilter).length > 0 && (
        <Button
          variant="contained"
          sx={{ backgroundColor: '#b88a0d', '&:hover': { background: '#bd9320' } }}
          startIcon={<SearchOff />}
          onClick={handleDeleteFilter}
        >
          USUŃ FILTRY WYSZUKIWANIA
        </Button>
      )}

      {selectedProducts && Object.keys(selectedProducts).length > 0 && (
        <Button
          variant="contained"
          sx={{ backgroundColor: 'blue', '&:hover': { background: '#69def5' } }}
          startIcon={<SearchOff />}
          onClick={handleDeleteSelectedList}
        >
          COFNIJ OZNACZENIE
        </Button>
      )}

      <TableContainer component={Paper} sx={{ height: '80vh', overflowY: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow sx={{position: 'sticky',top: 0, backgroundColor: 'white', zIndex: 1}}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                  inputProps={{ 'aria-label': 'select all products' }}
                />
              </TableCell>
              <BoldTableCell>ID</BoldTableCell>
              <BoldTableCell>Nazwa</BoldTableCell>
              <BoldTableCell>Kategoria</BoldTableCell>
              <BoldTableCell>Model</BoldTableCell>
              <BoldTableCell>Cena</BoldTableCell>
              <BoldTableCell>ID zamówienia</BoldTableCell>
              <BoldTableCell>Akcje</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    inputProps={{ 'aria-labelledby': product.id }}
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.nazwa}</TableCell>
                <TableCell>{product.kategoria}</TableCell>
                <TableCell>{product.model}</TableCell>
              <TableCell>{product.cena.toFixed(2)}</TableCell>
                <TableCell>{product.idZamowienia}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product.id)}><Edit /></IconButton>
                  <IconButton 
                    onClick={() => handleDeleteProduct(product.id)} 
                    disabled={selectedProducts.length !== 0} 
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginacja */}
      <TablePagination
        component="div"
        count={totalElements} 
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={25}
        rowsPerPageOptions={[25]}
      />

      <FilterDialog
        open={openFilterDialog}
        handleClose={handleCloseFilterDialog}
        tempFilter={tempFilter}
        handleFilterInputChange={handleFilterInputChange}
        handleFilterEdit={handleFilterEdit}
        kategoriaOptions={kategoriaOptions}
      />  
      <AddDialog
        open={openAddDialog}
        handleCloseAddDialog={handleCloseAddDialog}
        newProduct={newProduct}
        handleAddInputChange={handleAddInputChange}
        handleSaveNewProduct={handleSaveNewProduct}
        kategoriaOptions={kategoriaOptions}
      />  
      <EditDialog
        open={openEditDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        editedProduct={editedProduct}
        handleEditInputChange={handleEditInputChange}
        handleSaveEdit={handleSaveEdit}
        kategoriaOptions={kategoriaOptions}
      />   
      <ErrorDialog
        open={openErrorDialog}
        handleClose={handleCloseErrorDialog}
        httpStatus={errorInfo.status}
        errorData={errorInfo.data}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default ProductsPage;