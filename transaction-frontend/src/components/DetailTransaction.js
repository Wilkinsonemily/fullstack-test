import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTransactionById } from '../api/transactionApi';

function DetailTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionById(id);
        setData(response.data.data);
      } catch (error) {
        alert('Data tidak ditemukan');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!data) return <div>Data tidak ditemukan</div>;

  return (
    <div className="detail-container">
      <h2>Detail Transaksi</h2>
      <div className="detail-card">
        <div className="detail-row"><strong>ID:</strong> <span>{data.id}</span></div>
        <div className="detail-row"><strong>Product ID:</strong> <span>{data.productId}</span></div>
        <div className="detail-row"><strong>Product Name:</strong> <span>{data.productName}</span></div>
        <div className="detail-row"><strong>Amount:</strong> <span>{formatCurrency(data.amount)}</span></div>
        <div className="detail-row"><strong>Customer Name:</strong> <span>{data.customerName}</span></div>
        <div className="detail-row">
          <strong>Status:</strong>
          <span className={`badge ${data.status === 0 ? 'success' : 'failed'}`}>
            {data.statusName}
          </span>
        </div>
        <div className="detail-row"><strong>Transaction Date:</strong> <span>{data.transactionDate}</span></div>
        <div className="detail-row"><strong>Create By:</strong> <span>{data.createBy}</span></div>
        <div className="detail-row"><strong>Create On:</strong> <span>{data.createOn}</span></div>
      </div>

      <div className="form-actions">
        <Link to={`/edit/${data.id}`} className="btn btn-warning">Edit</Link>
        <button onClick={() => navigate('/')} className="btn btn-secondary">Back to List</button>
      </div>
    </div>
  );
}

export default DetailTransaction;