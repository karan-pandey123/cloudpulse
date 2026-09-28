import { useEffect, useState } from 'react';
import api from '../api/axios';
import ResourceForm from '../components/ResourceForm';

const Dashboard = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');

  const fetchResources = async () => {
    try {
      const res = await api.get('/api/resources');
      setResources(res.data);
    } catch (err) {
      setError('Failed to load resources');
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

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Your EC2 Resources</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ResourceForm onAdded={(r) => setResources([...resources, r])} />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
            <th>Name</th><th>Instance ID</th><th>Region</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <tr key={r._id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{r.name}</td>
              <td>{r.instanceId}</td>
              <td>{r.region}</td>
              <td>{r.status}</td>
              <td><button onClick={() => handleDelete(r._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {resources.length === 0 && <p>No resources added yet.</p>}
    </div>
  );
};

export default Dashboard;