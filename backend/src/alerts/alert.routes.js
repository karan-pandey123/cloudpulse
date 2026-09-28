const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const { receiveAlert, getAlertHistory } = require('./alert.controller');

router.post('/webhook', receiveAlert);
router.get('/', protect, getAlertHistory);

module.exports = router;