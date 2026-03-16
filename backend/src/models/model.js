const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fileUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    config: {
        cameraPosition: { x: Number, y: Number, z: Number },
        cameraRotation: { x: Number, y: Number, z: Number }
    }
}, { timestamps: true });

module.exports = mongoose.model('Model', modelSchema);
