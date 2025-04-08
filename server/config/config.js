require('dotenv').config();
const Joi = require('joi'); // Importing Joi for validation

// Define a schema for environment variable validation
const envSchema = Joi.object({
    MONGO_URI: Joi.string().uri().required(),
    PORT: Joi.number().integer().min(1).max(65535).default(5000),
}).unknown(); // Allow unknown keys

// Validate environment variables
const { error, value: validatedEnv } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Configuration error: ${error.message}`);
}

module.exports = {
    MONGO_URI: validatedEnv.MONGO_URI,
    PORT: validatedEnv.PORT,
};