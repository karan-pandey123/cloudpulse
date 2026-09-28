const Resource = require('./Resource.model');

// Add a new resource
const addResource = async (req, res) => {
  try {
    const { name, instanceId, region } = req.body;

    const newResource = new Resource({
      name,
      instanceId,
      region,
      addedBy: req.user.id,
    });

    await newResource.save();
    res.status(201).json({ message: 'Resource added successfully', resource: newResource });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all resources (for logged-in user)
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ addedBy: req.user.id });
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a resource
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const resource = await Resource.findOneAndUpdate(
      { _id: id, addedBy: req.user.id },
      updates,
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json({ message: 'Resource updated successfully', resource });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a resource
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findOneAndDelete({ _id: id, addedBy: req.user.id });

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addResource, getResources, updateResource, deleteResource };