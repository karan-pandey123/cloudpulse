import { useState } from 'react';
import api from '../api/axios';

const ResourceForm = ({ onAdded }) => {
  const [form, setForm] = useState({ name: '', instanceId: '', region: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/api/resources', form);
      onAdded(res.data.resource);
      setForm({ name: '', instanceId: '', region: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add resource');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Instance ID (i-xxxxx)"
        value={form.instanceId}
        onChange={(e) => setForm({ ...form, instanceId: e.target.value })}
        required
      />
      <input
        placeholder="Region (e.g. ap-south-1)"
        value={form.region}
        onChange={(e) => setForm({ ...form, region: e.target.value })}
        required
      />
      <button type="submit">Add Resource</button>
      {error && <p style={{ color: 'red', width: '100%' }}>{error}</p>}
    </form>
  );
};

export default ResourceForm;