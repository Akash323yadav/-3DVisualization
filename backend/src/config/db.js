const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`[Database] MongoDB Connected to: ${conn.connection.name}`);
    } catch (error) {
        console.error(`[Database Error] Failed to connect: ${error.message}`);
        console.warn('Tip: Ensure MongoDB is running locally or update MONGODB_URI in .env');
        // Don't kill the process immediately if you want to test other parts
        // process.exit(1); 
    }
};

module.exports = connectDB;
