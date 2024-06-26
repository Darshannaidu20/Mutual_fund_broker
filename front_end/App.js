
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import MutualFunds from './MutualFunds';
import HDFC from './HDFC';
import SBI from './SBI';
import './App.css';

const Profile = () => <div><h2>Profile</h2></div>;
const Settings = () => <div><h2>Settings</h2></div>;
const Logout = () => <div><h2>Logout</h2></div>;

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard/mutualfunds" element={<MutualFunds />} />
            <Route path="/dashboard/hdfc" element={<HDFC />} />
            <Route path="/dashboard/sbi" element={<SBI />} />

            <Route path="/" element={<Login />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

