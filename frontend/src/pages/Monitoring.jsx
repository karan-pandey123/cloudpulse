const Monitoring = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Monitoring</div>
        <div className="page-subtitle">Live metrics from your EC2 instance via Grafana</div>
      </div>
      <div className="monitor-card">
        <div className="monitor-header">
          <span className="refresh-note"><span className="pulse-dot" /> Auto-refreshing every 15s</span>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Open in Grafana ↗
          </a>
        </div>
        <iframe
          src="http://localhost:3000/d/ad7w9rn/cloudpulseec2-monitoring?orgId=1&refresh=15s"
          title="Grafana Dashboard"
        />
      </div>
    </div>
  );
};

export default Monitoring;