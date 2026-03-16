const Model = require('../models/model');

const uploadModel = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        console.log(`[Storage] Processing: ${file.originalname}`);

        const newModel = new Model({
            name: req.body.name || file.originalname,
            fileUrl: file.location,
            userId: req.user.id,
        });

        await newModel.save();
        res.status(201).json(newModel);
    } catch (error) {
        console.error('[Backend Error]:', error.message);
        res.status(500).json({ message: 'Error: ' + error.message });
    }
};

const getModels = async (req, res) => {
    try {
        const models = await Model.find({ userId: req.user.id });
        res.json(models);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateModelState = async (req, res) => {
    try {
        const { id } = req.params;
        const { config } = req.body;

        const updatedModel = await Model.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { config },
            { new: true }
        );

        if (!updatedModel) return res.status(404).json({ message: 'Model not found' });
        res.json(updatedModel);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { uploadModel, getModels, updateModelState };
