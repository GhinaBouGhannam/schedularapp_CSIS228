// Import the database query function to enter queries and fetch data from the database  
const { query } = require("../database/db");
require('dotenv').config(); // Load environment variables from .env file

/**
 * Inserts a new user into the database.
 *
 * @param {string} user_name The username for the new user.
 * @param {string} password The password for the new user.
 * @param {string} user_email The email address for the new user.
 * @param {string} user_description A description of the new user.
 * @returns The newly created user object.
 */
const insertUser = async (user_name, password, user_email, user_description) => {
  try {
    // Check if the username is already used by another user
    let x = `SELECT * FROM user WHERE user_name = ?`;
    var y = await query(x, [user_name]);
    if(y.length > 0){
      return "Username already used";
    }

    // Construct SQL query to insert new user
    let sql = `
      INSERT INTO user (user_name, password, user_email, user_description)
      VALUES (?,?,?,?)
    `;

    // Execute the query using the provided parameters
    let response = await query(sql, [user_name, password, user_email, user_description]);

    // Retrieve the newly created user
    var user = await query(`SELECT * FROM user WHERE user_id=?`, [response?.insertId]);

    // Return the newly created user object
    return user;
  } 
  catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: "Internal Error" });
    throw new Error(error); // throw error
  }
}

/**
 * Updates an existing user record in the database.
 *
 * @param {string} user_name The new username for the user.
 * @param {string} password The new password for the user.
 * @param {string} user_email The new email address for the user.
 * @param {string} user_description The new description for the user.
 * @param {number} user_id The ID of the user to update.
 * @returns {string} The updated user record or the string "User not found" if the user is not found.
 */
const updateUser = async (user_name, password, user_email, user_description, user_id) => {
  try {
    // Check if the username is already used by another user
    let x = `SELECT * FROM user WHERE user_name = ? AND user_id != ?`;
    var y = await query(x, [user_name, user_id]);
    if(y.length > 0){
      return "Username already used";
    }

    // Construct the SQL query to update the user record
    const sql = `
      UPDATE user SET user_name = ?, password = ?, user_email = ?, user_description = ?
      WHERE user_id = ? `;


    // Execute the SQL query and await the response
    const response = await query(sql, [user_name, password, user_email, user_description, user_id]);

    // Check if the user was found and updated successfully
    if (response.length === 0) {
      return "User not found";
    }

    // Fetch the updated user record to check if found
    const user = await query(`SELECT * FROM user WHERE user_id = ?`, [user_id]);
    if (user.length===0){
      return " User not found ";
    }

    // Return the updated user record
    return user;
  }
   catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({ message: "Internal Error" });
    throw new Error(error);
  }
}
 
/**
 * Deletes an existing user record from the database.
 *
 * @param {number} user_id The ID of the user to delete.
 * @returns {string} The deleted user record or the string "User not found" if the user is not found.
 */
const deleteUser = async (user_id) => {
  try {
    // Check if the user exists before deleting
    const user = await query(`SELECT * FROM user WHERE user_id = ?`, [user_id]);
    if (user.length === 0) {
      return "User not found";
    }

    // Construct the SQL query to delete the user record
    const sql = `DELETE FROM user WHERE user_id = ?`;

    // Execute the SQL query and await the response
    await query(sql, [user_id]);

    // Return the deleted user record
    return user;
  } 
  catch (error) {
    // Handle any errors that occur during the deletion process
    res.status(500).json({ message: "Internal Error" });
    throw new Error(error);
  }
}

/**
 * Authenticates a user by verifying their username and password against the database.
 *
 * @param {string} user_name The username of the user to authenticate.
 * @param {string} password The password of the user to authenticate.
 * @returns {string} The ID of the user if the authentication is successful, or the string "Invalid username or password" if the authentication fails.
 */
const authenticateUser = async (user_name, password) => {
  try {
    // Construct the SQL query to check user credentials
    const sql = `SELECT user_id FROM user WHERE user_name = ? AND password = ?`;

    // Execute the SQL query and await the response
    const id = await query(sql, [user_name, password]);

    if (id.length > 0) {
      // User authentication successful, return user ID
      return id;
    } else {
      // Invalid username or password
      return "Invalid username or password";
    }
  } 
  catch (error) {
    // Handle any errors that occur during the authentication process
    res.status(500).json({ message: "Internal Error" });
    throw new Error(error); // throw error
  }
}

/**
 * Retrieves all user records from the database if the provided credentials match the administrator's credentials.
 *
 * @param {string} user_name The username of the user attempting to access the function.
 * @param {string} password The password of the user attempting to access the function.
 * @returns {array} An array of user objects or the string "Invalid username or password" 
 * if the provided credentials do not match the administrator's credentials.
 */
const getAllUsers = async (user_name, password) => {
  try {
    
    // Verify that the provided credentials match the administrator's credentials
    if (user_name !== process.env.ADMIN || password !== process.env.ADMIN_PASSWORD) {
      console.log(password);
      return "Invalid username or password";
    }

    // Fetch all user records from the database
    const users = await query(`SELECT * FROM user`);

    // Return all user records
    return users;
  } 
  catch (error) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ message: "Internal Error" });
    throw new Error(error); // throw error
  }
};

// Export all services
module.exports ={ updateUser,deleteUser,insertUser,getAllUsers,authenticateUser};
