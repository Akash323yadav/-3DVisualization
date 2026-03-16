const express = require('express');
const { uploadModel, getModels, updateModelState } = require('../controllers/modelController');
const { authenticate } = require('../middleware/auth');
const { upload } = require('../config/s3');
const router = express.Router();

// Demo Mode fallback for AWS S3
router.post('/upload', authenticate, (req, res, next) => {
    upload.single('model')(req, res, (err) => {
        if (err) {
            console.warn('[Demo Mode] AWS Error:', err.message);
            req.file = {
                originalname: 'Model_Demo.glb',
                location: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'
            };
        }
        next();
    });
}, uploadModel);
router.get('/', authenticate, getModels);
router.patch('/:id/state', authenticate, updateModelState);

module.exports = router;
