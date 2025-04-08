const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    const maxRetries = 5; 
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            await mongoose.connect(config.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true, 
                useFindAndModify: false, 
            });
            console.log('MongoDB connected successfully');
            return; // Exit the function on successful connection
        } catch (error) {
            attempts++;
            console.error(`MongoDB connection attempt ${attempts} failed: ${error.message}`);

            if (attempts < maxRetries) {
                console.log(`Retrying connection in 5 seconds...`);
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait before retrying
            } else {
                console.error('Max connection attempts reached. Exiting...');
                process.exit(1); 
            }
        }
    }
};

module.exports = connectDB;