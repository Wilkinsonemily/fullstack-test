import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTransactionById, updateTransaction } from '../api/transactionApi';

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    amount: '',
    customerName: '',
    status: 0,
    transactionDate: '',
    createBy: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getTransactionById(id);
        const data = response.data.data;
        setFormData({
          productId: data.productId,
          productName: data.productName,
          amount: data.amount,
          customerName: data.customerName,
          status: data.status,
          transactionDate: data.transactionDate.replace(' ', 'T').slice(0, 16),
          createBy: data.createBy,
        });
      } catch (error) {
        alert('Gagal memuat data');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'status' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        transactionDate: formData.transactionDate.replace('T', ' ') + ':00',
        amount: parseFloat(formData.amount),
      };
      await updateTransaction(id, dataToSend);
      alert('Data berhasil diupdate!');
      navigate('/');
    } catch (error) {
      alert('Gagal update: ' + error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="form-container">
      <h2>Edit Transaksi #{id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product ID:</label>
          <input type="text" name="productId" value={formData.productId} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} step="0.01" required />
        </div>
        <div className="form-group">
          <label>Customer Name:</label>
          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value={0}>SUCCESS</option>
            <option value={1}>FAILED</option>
          </select>
        </div>
        <div className="form-group">
          <label>Transaction Date:</label>
          <input type="datetime-local" name="transactionDate" value={formData.transactionDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Create By:</label>
          <input type="text" name="createBy" value={formData.createBy} onChange={handleChange} required />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditTransaction;