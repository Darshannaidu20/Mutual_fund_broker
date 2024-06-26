
// src/Dashboard.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import './Dashboard.css';
import MutualFunds from './MutualFunds';
import CardPage from './card';
import HDFC from './HDFC'; 
import SBI from './SBI';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Sales Data',
    },
  },
};

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/mutualfunds">Mutual Funds</Link></li>
          <li><Link to="/dashboard/hdfc">HDFC</Link></li> 
          <li><Link to="/dashboard/sbi">SBI</Link></li> 
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
      <div className="content">
        <Grid container spacing={3}>
          <Grid item sm={12}><h2>Dashboard</h2></Grid>
          <Grid item sm={7} display={"flex"} justifyContent={"center"}><Bar data={data} options={options} /></Grid>
          <Grid item sm={12}><CardPage /></Grid>
        </Grid>

        <Routes>
          <Route path="/dashboard/mutualfunds" element={<MutualFunds />} />
          <Route path="/dashboard/hdfc" element={<HDFC />} /> {/* Add HDFC route */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
