const express = require('express');
const { uploadModel, getModels, updateModelState } = require('../controllers/modelController');
const { authenticate } = require('../middleware/auth');
const { upload } = require('../config/s3');
const router = express.Router();

router.post('/upload', authenticate, upload.single('model'), uploadModel);
router.get('/', authenticate, getModels);
router.patch('/:id/state', authenticate, updateModelState);

module.exports = router;
