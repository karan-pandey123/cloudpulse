const Monitoring = () => {
  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Monitoring</h2>
      <p>Live Grafana dashboard:</p>
      <iframe
        src="http://localhost:3000/d/ad7w9rn/cloudpulseec2-monitoring?orgId=1&refresh=15s"
        width="100%"
        height="600"
        title="Grafana Dashboard"
        style={{ border: 'none' }}
      />
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Note: if the panel doesn't load, check Grafana dashboard settings, or open Grafana directly at localhost:3000.
      </p>
    </div>
  );
};

export default Monitoring;