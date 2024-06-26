
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, CircularProgress, Alert as MuiAlert, Button, Snackbar } from '@mui/material';
import './customScrollbar.css'; 

const CustomAlert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MutualFunds = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchMutualFunds = async () => {
    try {
      const response = await axios.get('http://localhost:8000/fetch-mutual-fund-nav', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFunds(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMutualFunds();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <MuiAlert severity="error">{error}</MuiAlert>;

  
  const columns = [
    { field: 'Scheme_Code', headerName: 'Scheme Code', width: 150 },
    { field: 'Scheme_Name', headerName: 'Scheme Name', width: 300 },
    { field: 'Net_Asset_Value', headerName: 'NAV', width: 150, type: 'number' },
    { field: 'Date', headerName: 'Date', width: 150 },
    { field: 'Scheme_Type', headerName: 'Scheme Type', width: 200 },
    { field: 'Scheme_Category', headerName: 'Scheme Category', width: 250 },
    { field: 'Mutual_Fund_Family', headerName: 'Fund Family', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePurchase(params.row)}
        >
          Buy
        </Button>
      ),
    },
  ];


  const rows = funds.map((fund, index) => ({ id: index, ...fund }));

  const handlePurchase = (row) => {
    console.log('Purchased:', row);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>
      <h2>Mutual Funds</h2>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid 
          rows={rows} 
          columns={columns} 
          pageSize={10} 
          sx={{
            '& .MuiDataGrid-root': {
              '&.custom-scrollbar': {
                '& .MuiDataGrid-viewport': {
                  '&::-webkit-scrollbar': {
                    width: '12px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#444',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '6px',
                    border: '3px solid #444',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                  },
                },
              },
            },
            '& .MuiDataGrid-cell': {
              color: 'white',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#555',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: 'black',
            },
            backgroundColor: '#333',
          }}
          className="custom-scrollbar"
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      >
        <CustomAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully purchased!
        </CustomAlert>
      </Snackbar>
    </Container>
  );
};

export default MutualFunds;