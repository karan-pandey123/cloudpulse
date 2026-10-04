import { useEffect, useState } from 'react';
import api from '../api/axios';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const res = await api.get('/api/alerts');
      setAlerts(res.data);
    } catch (err) {
      setError('Failed to load alert history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Alert History</div>
        <div className="page-subtitle">Record of all CPU threshold alerts fired by Grafana</div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="page-loading"><span className="spinner" /> Loading alert history...</div>
      ) : alerts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔔</div>
          <div>No alerts recorded yet.</div>
        </div>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Alert</th><th>Status</th><th>Instance</th><th>Summary</th><th>Time</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a._id}>
                  <td>{a.alertName}</td>
                  <td><span className={`badge badge-${a.status}`}>{a.status}</span></td>
                  <td>{a.instance}</td>
                  <td>{a.summary}</td>
                  <td>{new Date(a.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="refresh-note"><span className="pulse-dot" /> Auto-refreshing every 15s</div>
    </div>
  );
};

export default Alerts;