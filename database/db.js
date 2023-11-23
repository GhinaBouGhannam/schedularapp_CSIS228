const mysql = require('mysql2/promise'); // Import MYSQL2 to interact with MYSQL database
const config = require('./config'); // Import configuration object

// variable to hold the connection object representing the established connection to database
var connection; 

/**
 * Establish a database connection
 * 
 * @returns {Promise} Resolves on successful connection, rejects on error
 */
const connect = async()=>{
    try{
        // Create connection to database using the provided configuration
       connection = await mysql.createConnection(config.db);
       console.log("=====================================================");
       console.log(`>>>>>Connection to ${process.env.DB_NAME} successful`); // the database name from .env file
       console.log("=====================================================");
    }

    /**
     * Handle any error that may occur during connection and display error message 
     */
    catch(error){
        console.error(`>>>> Error connecting to ${process.env.DB-NAME}`);
        process.exit();
    }
}

/**
 * Execute an SQL query against the established database connection
 *
 * @param {string} sql The SQL query to execute
 * @param {Array} params An optional array of parameters for the query
 * @returns {Promise} Resolves with the query results, rejects on error
 */
const query =async(sql,params)=>{
    // Check if a connection exists to ensure establishing one connection
    if(!connection){
         await connect();
    }
    
    try{ 
        // Execute SQL query using connection object and parameters
        const [results]= await connection.execute(sql,params);
        return results;
    }

    /**
     * Handle any error that may occur during execution and display error message
     */
    catch(error){
        console.error(`Query Error -> ${sql}` ,error.message );
        throw new Error(error); // Throw an error 
    }
}

// Export the query function
module.exports={ query}