require('dotenv').config(); // Load environment variables from .env file

// Define configuration object for database connection
const config ={
    db: {
        host: process.env.DB_HOST, // Database host
        user: process.env.DB_USER, // Database username
        password: process.env.DB_PASS, // Database password
        database: process.env.DB_NAME, // Database name 
        connectionLimit: 10, // maximum number of database connections
    }      
}

// Export configuration object
module.exports =config;