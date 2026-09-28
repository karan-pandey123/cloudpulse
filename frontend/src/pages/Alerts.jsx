import { useEffect, useState } from 'react';
import api from '../api/axios';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');

  const fetchAlerts = async () => {
    try {
      const res = await api.get('/api/alerts');
      setAlerts(res.data);
    } catch (err) {
      setError('Failed to load alert history');
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Alert History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
            <th>Alert</th><th>Status</th><th>Instance</th><th>Summary</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr key={a._id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{a.alertName}</td>
              <td style={{ color: a.status === 'firing' ? 'red' : 'green', fontWeight: 'bold' }}>
                {a.status.toUpperCase()}
              </td>
              <td>{a.instance}</td>
              <td>{a.summary}</td>
              <td>{new Date(a.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {alerts.length === 0 && <p>No alerts recorded yet.</p>}
    </div>
  );
};

export default Alerts;