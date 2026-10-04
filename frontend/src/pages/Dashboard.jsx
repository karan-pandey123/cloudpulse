import { useEffect, useState } from 'react';
import api from '../api/axios';
import ResourceForm from '../components/ResourceForm';

const badgeClass = (status) => {
  if (status === 'healthy') return 'badge badge-healthy';
  if (status === 'unhealthy') return 'badge badge-unhealthy';
  return 'badge badge-unknown';
};

const Dashboard = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      const res = await api.get('/api/resources');
      setResources(res.data);
    } catch (err) {
      setError('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/resources/${id}`);
      setResources(resources.filter((r) => r._id !== id));
    } catch (err) {
      setError('Failed to delete');
    }
  };

  const healthyCount = resources.filter((r) => r.status === 'healthy').length;
  const unknownCount = resources.filter((r) => r.status === 'unknown').length;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Your EC2 Resources</div>
        <div className="page-subtitle">Manage and track the servers you're monitoring</div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{resources.length}</div>
          <div className="stat-label">Total Resources</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{healthyCount}</div>
          <div className="stat-label">Healthy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{unknownCount}</div>
          <div className="stat-label">Unknown Status</div>
        </div>
      </div>

      <ResourceForm onAdded={(r) => setResources([...resources, r])} />

      {loading ? (
        <div className="page-loading"><span className="spinner" /> Loading resources...</div>
      ) : resources.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🖥️</div>
          <div>No resources added yet. Add your first EC2 instance above.</div>
        </div>
      ) : (
        <div className="resource-grid">
          {resources.map((r) => (
            <div className="resource-card" key={r._id}>
              <div className="resource-card-top">
                <div>
                  <div className="resource-name">{r.name}</div>
                  <div className="resource-meta">{r.instanceId}</div>
                  <div className="resource-meta">{r.region}</div>
                </div>
                <span className={badgeClass(r.status)}>{r.status}</span>
              </div>
              <div className="resource-card-footer">
                <button className="btn-delete" onClick={() => handleDelete(r._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;