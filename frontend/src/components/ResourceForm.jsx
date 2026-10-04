import { useState } from 'react';
import api from '../api/axios';

const ResourceForm = ({ onAdded }) => {
  const [form, setForm] = useState({ name: '', instanceId: '', region: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/resources', form);
      onAdded(res.data.resource);
      setForm({ name: '', instanceId: '', region: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add resource');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-card-title">+ Add New Resource</div>
      {error && <div className="error-banner">{error}</div>}
      <form onSubmit={handleSubmit} className="inline-form">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            className="form-input"
            placeholder="My Web Server"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Instance ID</label>
          <input
            className="form-input"
            placeholder="i-0abc123def456"
            value={form.instanceId}
            onChange={(e) => setForm({ ...form, instanceId: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Region</label>
          <input
            className="form-input"
            placeholder="ap-south-1"
            value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Add Resource'}
        </button>
      </form>
    </div>
  );
};

export default ResourceForm;