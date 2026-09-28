const AlertHistory = require('./AlertHistory.model');

const receiveAlert = async (req, res) => {
  try {
    const alerts = req.body.alerts || [];
    const saved = [];
    for (const a of alerts) {
      const entry = await AlertHistory.create({
        alertName: a.labels?.alertname || 'Unknown',
        status: a.status,
        instance: a.labels?.instance || '',
        value: a.values ? JSON.stringify(a.values) : '',
        summary: a.annotations?.summary || '',
      });
      saved.push(entry);
    }
    res.status(201).json({ message: 'Alert(s) recorded', count: saved.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAlertHistory = async (req, res) => {
  try {
    const alerts = await AlertHistory.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { receiveAlert, getAlertHistory };