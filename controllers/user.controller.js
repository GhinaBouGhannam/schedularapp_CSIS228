// Include the `express-validator` library for request validation
const { validationResult } = require("express-validator");
// Import the patient-related services
const { insertUser, updateUser, deleteUser, getAllUsers, authenticateUser } = require("../services/user.service");

/**
 * Creates a new user in the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing the response from the user service or an error message
 */
const insertUserController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { user_name, password, user_email, user_description } = req.body;

    // Call the user service to insert the new user
    const response = await insertUser(user_name, password, user_email, user_description);

    // Return successful response with the inserted user data
    res.status(200).json({ response });
  } 
  catch (error) {
    // Handle internal errors
    res.status(500).json(error);
  }
}

/**
 * Updates an existing user in the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing the response from the user service or an error message
 */
const updateUserController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { user_name, password, user_email, user_description, user_id } = req.body;

    // Call the user service to update the existing user
    const response = await updateUser(user_name , password,user_email,user_description,user_id);

    // Return successful response with the updated user data
    res.status(200).json({ response });
  } 
  catch (error) {
    // Handle internal errors
    res.status(500).json(error);
  }
}

/**
 * Deletes an existing user from the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing the deleted user data or an error message
 */
const deleteUserController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user ID from request body
    const { user_id } = req.body;

    // Call the user service to delete the specified user
    const response = await deleteUser( user_id);

    // Return successful response with the deleted user data
    res.status(200).json({ response });
  } 
  catch (error) {
    // Handle internal errors
    res.status(500).json(error);
  }
}

/**
 * Retrieves a list of all users from the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing a list of users or an error message
 */
const getAllUsersController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract name and password from request body
    const { user_name, password } = req.body;

    // Call the user service to fetch all users
    const users = await getAllUsers(user_name, password);

    // Return successful response with the list of users
    res.status(200).json({ users });
  } 
  catch (error) {
    // Handle internal errors
    res.status(500).json(error);
  }
}

/**
 * Authenticates a user by validating their credentials.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing the authentication id or an error message
 */
const authenticateUserController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user credentials from request body
    const { user_name, password } = req.body;

    // Call the user service to authenticate the user
    const response = await authenticateUser(user_name, password);

    // Return successful response with the authenticated user id
    res.status(200).json({ response });
  } 
  catch (error) {
    // Handle internal errors
    res.status(500).json(error);
  }
}

// Export all controllers
module.exports={
  insertUserController,updateUserController,deleteUserController,getAllUsersController,authenticateUserController 
}
  
  
   
  