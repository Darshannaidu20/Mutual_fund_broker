import React, { useState } from 'react';
import { Container, Button, Snackbar, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';

const CustomAlert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SBI = () => {
  const [open, setOpen] = useState(false);

  const hdfcData = [
    { Scheme_Code: 101, Scheme_Name: 'HDFC Equity Fund', Net_Asset_Value: 500, Date: '2023-06-01', Scheme_Type: 'Open Ended', Scheme_Category: 'Equity', Mutual_Fund_Family: 'HDFC' },
    { Scheme_Code: 102, Scheme_Name: 'HDFC Balanced Fund', Net_Asset_Value: 350, Date: '2023-06-01', Scheme_Type: 'Open Ended', Scheme_Category: 'Balanced', Mutual_Fund_Family: 'HDFC' },
    { Scheme_Code: 103, Scheme_Name: 'HDFC Balanced Fund', Net_Asset_Value: 120, Date: '2023-06-26', Scheme_Type: 'Open Ended', Scheme_Category: 'Balanced', Mutual_Fund_Family: 'HDFC' },
    { Scheme_Code: 104, Scheme_Name: 'HDFC Balanced Fund', Net_Asset_Value: 120, Date: '2023-06-26', Scheme_Type: 'Open Ended', Scheme_Category: 'Balanced', Mutual_Fund_Family: 'HDFC'},
    { Scheme_Code: 105, Scheme_Name: 'HDFC Balanced Fund', Net_Asset_Value: 120, Date: '2023-06-28', Scheme_Type: 'Open Ended', Scheme_Category: 'Balanced', Mutual_Fund_Family: 'HDFC'},
  ];

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

  const rows = hdfcData.map((fund, index) => ({ id: index, ...fund }));

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
      <h2>SBI Data</h2>
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

export default SBI;