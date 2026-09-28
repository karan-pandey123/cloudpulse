const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const {
  addResource,
  getResources,
  updateResource,
  deleteResource,
} = require('./resource.controller');

router.post('/', protect, addResource);
router.get('/', protect, getResources);
router.put('/:id', protect, updateResource);
router.delete('/:id', protect, deleteResource);

module.exports = router;