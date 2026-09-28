const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./auth/auth.routes');
const resourceRoutes = require('./resource/resource.routes');
const alertRoutes = require('./alerts/alert.routes');
const errorHandler = require('./middleware/error.middleware');

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CloudPulse API running');
});

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/alerts', alertRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));