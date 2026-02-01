const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error('ERROR: MONGODB_URI is not defined in .env file');
    process.exit(1);
}

console.log('Attempting to connect to MongoDB...');

mongoose.connect(mongoURI)
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB');
        process.exit(0);
    })
    .catch(err => {
        console.error('ERROR: Could not connect to MongoDB');
        console.error('Error details:', err.message);
        process.exit(1);
    });
