import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../services/authService'; 
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Checkbox, 
  IconButton, Button, Paper,
} from '@mui/material';
import { Edit, Delete, Add, Search, SearchOff} from '@mui/icons-material';
import FilterDialog from '../components/orderPage/FilterOrder';
import AddDialog from '../components/orderPage/AddOrder';
import EditDialog from '../components/orderPage/EditOrder';
import ErrorDialog from '../components/orderPage/ErrorOrder';

const BoldTableCell = ({children, ...props}) => (
  <TableCell sx={{fontWeight: 'bold'}} {...props}>
    {children}
  </TableCell>
);

const OrdersPage = () => {

  // SELEKTORY
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]); 
  
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
  const [editedOrder, setEditedOrder] = useState(null); 

  // DODAWANIE
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const initialNewOrderState = {
    idKlienta: '',
    status: '',
    dataZlozenia: '',
    platnosc: '',
    dostawa: '',
    kwotaCalkowita: '',
    oplacone: null,
  };
  const [newOrder, setNewOrder] = useState(initialNewOrderState);

  // FILTER
  const [newFilter, setNewFilter] = useState(null);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [tempFilter, setTempFilter] = useState(null);

  // OPCJE W COMBOBOXACH
  const statusOptions = ["Nowe", "Realizowane", "Wysłane", "Dostarczone"];
  const paymentOptions = ["Karta kredytowa", "Przelew", "BLIK", "Przy odbiorze"];
  const deliveryOptions = ["Kurier DPD", "Kurier INPOST", "Odbiór osobisty"];

  useEffect(() => {
    const fetchFilteredOrAllOrders = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
          newFilter ? 'http://localhost:8080/orders/filter' : 'http://localhost:8080/orders',
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
    
        // Sprawdź, czy otrzymane dane różnią się od obecnych, aby uniknąć duplikatów
        setOrders(response.data.content);
        setTotalElements(response.data.totalElements);
      } catch (error) {
        handleError(error);
      }
    };
  
    fetchFilteredOrAllOrders();
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
  const handleEdit = (orderId) => {
    const orderToEdit = orders.find(order => order.id === orderId); 
    if (orderToEdit) {
      setEditedOrder({ ...orderToEdit }); 
      setOpenEditDialog(true); 
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditedOrder(null); 
  };

  const handleEditInputChange = (field, value) => {
    setEditedOrder({
      ...editedOrder,
      [field]: value, 
    });
  };

  const handleSaveEdit = async () => {
    try {
      const token = getToken();
      const response = await axios.put(`http://localhost:8080/orders/${editedOrder.id}`, editedOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(orders.map(order => (order.id === editedOrder.id ? response.data : order)));
      setOpenEditDialog(false);
      setEditedOrder(null);
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

  const handleSelectOrder = (orderId) => {
    const newSelectedOrders = selectedOrders.includes(orderId)
      ? selectedOrders.filter(id => id !== orderId) 
      : [...selectedOrders, orderId]; 
    setSelectedOrders(newSelectedOrders);
  };

 
  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]); 
    } else {
      setSelectedOrders(orders.map(order => order.id)); 
    }
  };

  const handleDeleteSelectedList = () => {
    setSelectedOrders([]);
  }

  // ----------------------- USUWANIE  -------------------------------------------------

  const updatePageAfterDelete = async (orders, setOrders, setPage, setTotalElements, page, selectedOrders) => {

    if (orders.length < 25) {
      const nextPage = page + 1;

      try {
        const token = getToken();
        const response = await axios.get('http://localhost:8080/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: nextPage,
            size: 25,
          },
        });


        const newOrders = response.data.content.filter(
          (order) => !orders.some((p) => p.id === order.id)
        );
  
  
        setOrders([...orders, ...newOrders]);
  
        if (orders.length === 0 && page > 0) {
          setPage(page - 1);
        }
      } catch (error) {
        handleError(error);
      }
    }
    setTotalElements(prev => prev - (selectedOrders ? selectedOrders.length : 1));
  };
  

  const handleDeleteSelected = async () => {
    try {
      const token = getToken();
      await axios.delete('http://localhost:8080/orders/batch', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: selectedOrders,
      });
  
      const updatedOrders = orders.filter(order => !selectedOrders.includes(order.id));
      setOrders(updatedOrders);
      setSelectedOrders([]);
      updatePageAfterDelete(updatedOrders, setOrders, setPage, setTotalElements, page, selectedOrders);
  
    } catch (error) {
      handleError(error);
    }
  };
  

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:8080/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);

      const updatedSelectedOrders = selectedOrders.filter(id => id !== orderId);
      setSelectedOrders(updatedSelectedOrders);
  
      updatePageAfterDelete(updatedOrders, setOrders, setPage, setTotalElements, page, null);
   
    } catch (error) {
      handleError(error);
    }
  };

  
  //------------------------------------------------ DODAWANIE --------------------------------------------------------

  const handleAdd = () => {
    setNewOrder(initialNewOrderState);
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  
  const handleSaveNewOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8080/orders', newOrder, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`, 
        },
      });
  
      setOrders([...orders, response.data]);
      setTotalElements((prevTotal) => prevTotal + 1);
      setOpenAddDialog(false); 
    } catch (error) {
      handleError(error);
    }
  };

  const handleAddInputChange = (field, value) => {
    setNewOrder({
      ...newOrder,
      [field]: value, 
    });
  };

   // ----------------------------------------------- WYSZUKIWANIE PO FILTRZE -----------------------------------------
  const handleDeleteFilter = () => {
    setNewFilter({});
    setPage(0);
    setSelectedOrders([]);
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
        const response = await axios.get('http://localhost:8080/orders/filter', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ...newFilter,  
            page: 0,
            size: 25,
          },
        });
  
        setOrders(response.data.content);  
        setTotalElements(response.data.totalElements);  
        setPage(0);  
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div aria-hidden="false">
      <h1>Zamówienia</h1>
      {error && <p>{error}</p>}


      <Button variant="contained"  
              sx={{ backgroundColor: 'green' }}
              onClick={handleAdd} 
              startIcon={<Add />}
            >
        Dodaj Zamówienie
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: 'red' , '&:hover':{ background: '#8f031d' }}}
        startIcon={<Delete />}
        onClick={handleDeleteSelected}
        disabled={selectedOrders.length === 0} 
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

      {selectedOrders && Object.keys(selectedOrders).length > 0 && (
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
                  checked={selectedOrders.length === orders.length}
                  onChange={handleSelectAll}
                  inputProps={{ 'aria-label': 'select all orders' }}
                />
              </TableCell>
              <BoldTableCell>ID</BoldTableCell>
              <BoldTableCell>ID Klienta</BoldTableCell>
              <BoldTableCell>Status</BoldTableCell>
              <BoldTableCell>Data Złożenia</BoldTableCell>
              <BoldTableCell>Kwota Całkowita</BoldTableCell>
              <BoldTableCell>Dostawa</BoldTableCell>
              <BoldTableCell>Płatność</BoldTableCell>
              <BoldTableCell>Opłacone</BoldTableCell>
              <BoldTableCell>Akcje</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                    inputProps={{ 'aria-labelledby': order.id }}
                  />
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.idKlienta}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                {new Date(order.dataZlozenia).toLocaleString('pl-PL', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })}
              </TableCell>
              <TableCell>{order.kwotaCalkowita.toFixed(2)}</TableCell>
                <TableCell>{order.dostawa}</TableCell>
                <TableCell>{order.platnosc}</TableCell>
                <TableCell>{order.oplacone ? 'Tak' : 'Nie'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(order.id)}><Edit /></IconButton>
                  <IconButton 
                    onClick={() => handleDeleteOrder(order.id)} 
                    disabled={selectedOrders.length !== 0} 
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
 
      {/* Dialog filtrowania*/}
      <FilterDialog
        open={openFilterDialog}
        handleClose={handleCloseFilterDialog}
        tempFilter={tempFilter}
        handleFilterInputChange={handleFilterInputChange}
        handleFilterEdit={handleFilterEdit}


        statusOptions={statusOptions}
        deliveryOptions={deliveryOptions}
        paymentOptions={paymentOptions}
      />  
      {/* Dialog dodawania*/}
      <AddDialog
        open={openAddDialog}
        handleCloseAddDialog={handleCloseAddDialog}
        newOrder={newOrder}
        handleAddInputChange={handleAddInputChange}
        handleSaveNewOrder={handleSaveNewOrder}
        statusOptions={statusOptions}
        deliveryOptions={deliveryOptions}
        paymentOptions={paymentOptions}
      />  
      {/* Dialog edycji*/} 
      <EditDialog
        open={openEditDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        editedOrder={editedOrder}
        handleEditInputChange={handleEditInputChange}
        handleSaveEdit={handleSaveEdit}
        statusOptions={statusOptions}
        deliveryOptions={deliveryOptions}
        paymentOptions={paymentOptions}
      />   

        {/* Dialog edycji*/} 
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

export default OrdersPage;
