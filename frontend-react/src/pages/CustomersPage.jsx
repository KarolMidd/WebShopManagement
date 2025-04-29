import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../services/authService'; 
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Checkbox, 
  IconButton, Button, Paper,
} from '@mui/material';
import { Edit, Delete, Add, Search, SearchOff} from '@mui/icons-material';
import FilterCustomer from '../components/customerPage/FilterCustomer';
import AddCustomer from '../components/customerPage/AddCustomer';
import EditCustomer from '../components/customerPage/EditCustomer';
import ErrorCustomer from '../components/customerPage/ErrorCustomer';

const BoldTableCell = ({children, ...props}) => (
  <TableCell sx={{fontWeight: 'bold'}} {...props}>
    {children}
  </TableCell>
);

const CustomersPage = () => {

// SELEKTORY
const [customers, setCustomers] = useState([]);
const [selectedCustomers, setSelectedCustomers] = useState([]); 

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
const [editedCustomer, setEditedCustomer] = useState(null); 

// DODAWANIE
const [openAddDialog, setOpenAddDialog] = useState(false);
const initialNewCustomerState = {
  imie: '',
  nazwisko: '',
  email: '',
  ulica: '',
  nrLokalu: '',
  kodPocztowy: '',
  miasto: '',
  kodKraju: '',
  telefon: ''
};
const [newCustomer, setNewCustomer] = useState(initialNewCustomerState);

// FILTER
const [newFilter, setNewFilter] = useState(null);
const [openFilterDialog, setOpenFilterDialog] = useState(false);
const [tempFilter, setTempFilter] = useState(null);



useEffect(() => {
  const fetchFilteredOrAllCustomers = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        newFilter ? 'http://localhost:8080/customers/filter' : 'http://localhost:8080/customers',
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

      setCustomers(response.data.content);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      handleError(error);
    }
  };

  fetchFilteredOrAllCustomers();
}, [page, newFilter]);
// ------------------------ ERRORY ------------------

const handleCloseErrorDialog = () =>
{
  setOpenErrorDialog(false);
}


const handleError = (error) => {
  console.log("Error occurred:", error);
  
  if (error.response) {
    console.log("Error response status:", error.response.status);
    console.log("Error response data:", error.response.data);
  } else {
    console.log("No response from server or connection error:", error.message);
  }

  setErrorInfo({
    status: error.response?.status,
    data: error.response?.data,
  });
  setOpenErrorDialog(true);
};

// --------------------------- EDIT  --------------------------- 
const handleEdit = (customerId) => {
  const customerToEdit = customers.find(customers => customers.id === customerId); 
  if (customerToEdit) {
    setEditedCustomer({ ...customerToEdit }); 
    setOpenEditDialog(true); 
  }
};

const handleCloseEditDialog = () => {
  setOpenEditDialog(false);
  setEditedCustomer(null); 
};

const handleEditInputChange = (field, value) => {
  setEditedCustomer({
    ...editedCustomer,
    [field]: value, 
  });
};

const handleSaveEdit = async () => {
  try {
    const token = getToken();
    const response = await axios.put(`http://localhost:8080/customers/${editedCustomer.id}`, editedCustomer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCustomers(customers.map(customers => (customers.id === editedCustomer.id ? response.data : customers)));
    setOpenEditDialog(false);
    setEditedCustomer(null);
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

const handleSelectCustomer = (customerId) => {
  const newSelectedCustomer = selectedCustomers.includes(customerId)
    ? selectedCustomers.filter(id => id !== customerId) 
    : [...selectedCustomers, customerId]; 
  setSelectedCustomers(newSelectedCustomer);
};


const handleSelectAll = () => {
  if (selectedCustomers.length === customers.length) {
    setSelectedCustomers([]); 
  } else {
    setSelectedCustomers(customers.map(customers => customers.id)); 
  }
};

const handleDeleteSelectedList = () => {
  setSelectedCustomers([]);
}

// ----------------------- USUWANIE  -------------------------------------------------

const updatePageAfterDelete = async (customers, setCustomers, setPage, setTotalElements, page, selectedCustomers) => {
  if (customers.length < 25) {
    const nextPage = page + 1;

    try {
      const token = getToken();
      const response = await axios.get('http://localhost:8080/customers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: nextPage,
          size: 25,
        },
      });

      const newCustomers = response.data.content.filter(
        (newCustomer) => !customers.some((customer) => customer.id === newCustomer.id)
      );

      setCustomers([...customers, ...newCustomers]);

      if (customers.length === 0 && page > 0) {
        setPage(page - 1);
      }
    } catch (error) {
      handleError(error);
    }
  }

  setTotalElements((prev) => prev - (selectedCustomers ? selectedCustomers.length : 1));
};




const handleDeleteSelected = async () => {
  try {
    const token = getToken();
    await axios.delete('http://localhost:8080/customers/batch', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: selectedCustomers,
    });

    const updatedCustomer = customers.filter(customers => !selectedCustomers.includes(customers.id));
    setCustomers(updatedCustomer);
    setSelectedCustomers([]);

    updatePageAfterDelete(updatedCustomer, setCustomers, setPage, setTotalElements, page, selectedCustomers);

  } catch (error) {
    handleError(error);
  }
};


const handleDeleteCustomer = async (customerId) => {
  try {
    const token = getToken();
    console.log("Token:", token); 

    await axios.delete(`http://localhost:8080/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedCustomers = customers.filter(customers => customers.id !== customerId);
    setCustomers(updatedCustomers);

    const updatedSelectedCustomers = selectedCustomers.filter(id => id !== customerId);
    setSelectedCustomers(updatedSelectedCustomers);

    updatePageAfterDelete(updatedCustomers, setCustomers, setPage, setTotalElements, page, null);

  } catch (error) {
    console.error("Error deleting customers:", error);
    handleError(error);
  }
};




//------------------------------------------------ DODAWANIE --------------------------------------------------------

const handleAdd = () => {
  setNewCustomer(initialNewCustomerState);
  setOpenAddDialog(true);
};

const handleCloseAddDialog = () => {
  setOpenAddDialog(false);
};

const handleSaveNewCustomer = async () => {
  try {
    const response = await axios.post('http://localhost:8080/customers', newCustomer, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`, 
      },
    });

    setCustomers([...customers, response.data]);
    setTotalElements((prevTotal) => prevTotal + 1);
    setOpenAddDialog(false); 
  } catch (error) {
    handleError(error);
  }
};

const handleAddInputChange = (field, value) => {
  setNewCustomer({
    ...newCustomer,
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
    const response = await axios.get('http://localhost:8080/customers/filter', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      params: {
        ...newFilter,
        page: 0,
        size: 25, 
      },
    });

    setCustomers(response.data.content); 
    setTotalElements(response.data.totalElements);
    setPage(0);
  } catch (error) {
    handleError(error);
  }
};

  return (
    <div aria-hidden="false">
      <h1>Klienci</h1>
      {error && <p>{error}</p>}

      <Button variant="contained"  
              sx={{ backgroundColor: 'green' }}
              onClick={handleAdd} 
              startIcon={<Add />}
            >
        Dodaj klienta
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: 'red' , '&:hover':{ background: '#8f031d' }}}
        startIcon={<Delete />}
        onClick={handleDeleteSelected}
        disabled={selectedCustomers.length === 0} 
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

      {selectedCustomers && Object.keys(selectedCustomers).length > 0 && (
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
                  checked={selectedCustomers.length === customers.length}
                  onChange={handleSelectAll}
                  inputProps={{ 'aria-label': 'select all customers' }}
                />
              </TableCell>
              <BoldTableCell>ID</BoldTableCell>
              <BoldTableCell>Imię</BoldTableCell>
              <BoldTableCell>Nazwisko</BoldTableCell>
              <BoldTableCell>Email</BoldTableCell>
              <BoldTableCell>Ulica</BoldTableCell>
              <BoldTableCell>Nr lokalu</BoldTableCell>
              <BoldTableCell>Miasto</BoldTableCell>
              <BoldTableCell>Kod pocztowy</BoldTableCell>
              <BoldTableCell>Kod kraju</BoldTableCell>
              <BoldTableCell>Telefon</BoldTableCell>
              <BoldTableCell>Akcje</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customers) => (
              <TableRow key={customers.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCustomers.includes(customers.id)}
                    onChange={() => handleSelectCustomer(customers.id)}
                    inputProps={{ 'aria-labelledby': customers.id }}
                  />
                </TableCell>
                <TableCell>{customers.id}</TableCell>
                <TableCell>{customers.imie}</TableCell>
                <TableCell>{customers.nazwisko}</TableCell>
                <TableCell>{customers.email}</TableCell>
                <TableCell>{customers.ulica}</TableCell>
                <TableCell>{customers.nrLokalu}</TableCell>
                <TableCell>{customers.kodPocztowy}</TableCell>
                <TableCell>{customers.miasto}</TableCell>
                <TableCell>{customers.kodKraju}</TableCell>
                <TableCell>{customers.telefon}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(customers.id)}><Edit /></IconButton>
                  <IconButton 
                    onClick={() => handleDeleteCustomer(customers.id)} 
                    disabled={selectedCustomers.length !== 0} 
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

      <FilterCustomer
        open={openFilterDialog}
        handleClose={handleCloseFilterDialog}
        tempFilter={tempFilter}
        handleFilterInputChange={handleFilterInputChange}
        handleFilterEdit={handleFilterEdit}
      />  
      <AddCustomer
        open={openAddDialog}
        handleCloseAddDialog={handleCloseAddDialog}
        newCustomer={newCustomer}
        handleAddInputChange={handleAddInputChange}
        handleSaveNewCustomer={handleSaveNewCustomer}
      />  
      <EditCustomer
        open={openEditDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        editedCustomer={editedCustomer}
        handleEditInputChange={handleEditInputChange}
        handleSaveEdit={handleSaveEdit}
      />   
      <ErrorCustomer
        open={openErrorDialog}
        handleClose={handleCloseErrorDialog}
        httpStatus={errorInfo.status}
        errorData={errorInfo.data}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default CustomersPage;