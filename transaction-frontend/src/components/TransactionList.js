import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTransactions, deleteTransaction } from '../api/transactionApi';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await getAllTransactions();
      const data = response.data.data;
      setTransactions(data);
      groupByYearMonth(data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const groupByYearMonth = (data) => {
    const result = {};

    data.forEach((trx) => {
      const date = new Date(trx.transactionDate);

      const year = date.getFullYear();
      const month = date.toLocaleString('id-ID', { month: 'long' });

      const key = `${year} - ${month}`;

      if (!result[key]) {
        result[key] = {
          dateValue: new Date(year, date.getMonth()),
          items: [],
        };
      }

      result[key].items.push(trx);
    });

    const sortedKeys = Object.keys(result).sort((a, b) => {
      return result[b].dateValue - result[a].dateValue;
    });

    const sortedResult = {};

    sortedKeys.forEach((k) => {
      sortedResult[k] = result[k].items;
    });

    setGrouped(sortedResult);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data ini?')) return;
    try {
      await deleteTransaction(id);
      alert('Data berhasil dihapus');
      loadData();
    } catch (error) {
      alert('Gagal menghapus data');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="transaction-list">
      <h2>Daftar Transaksi (Grouped by Year & Month)</h2>

      {Object.keys(grouped).length === 0 ? (
        <p>Belum ada data transaksi.</p>
      ) : (
        Object.keys(grouped).map((key) => (
          <div key={key} className="group-section">
            <h3 className="group-header">{key}</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Transaction Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {grouped[key].map((trx) => (
                  <tr key={trx.id}>
                    <td>{trx.id}</td>
                    <td>{trx.productId}</td>
                    <td>{trx.productName}</td>
                    <td>{trx.customerName}</td>
                    <td>{formatCurrency(trx.amount)}</td>
                    <td>
                      <span className={`badge ${trx.status === 0 ? 'success' : 'failed'}`}>
                        {trx.statusName}
                      </span>
                    </td>
                    <td>{trx.transactionDate}</td>
                    <td>
                      <Link to={`/detail/${trx.id}`} className="btn btn-info">Detail</Link>
                      <Link to={`/edit/${trx.id}`} className="btn btn-warning">Edit</Link>
                      <button onClick={() => handleDelete(trx.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList;