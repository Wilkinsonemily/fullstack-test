import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import EditTransaction from './components/EditTransaction';
import DetailTransaction from './components/DetailTransaction';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<TransactionList />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/edit/:id" element={<EditTransaction />} />
          <Route path="/detail/:id" element={<DetailTransaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;