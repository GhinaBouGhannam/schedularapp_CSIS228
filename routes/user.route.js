// Import required modules
const express = require('express');
const { insertUserValidation, updateUserValidation, deleteUserValidation, 
    getAllUsersValidation, authenticateUserValidation } = require('../validators/user-validate');
const { insertUserController, updateUserController, deleteUserController, 
    getAllUsersController, authenticateUserController } = require('../controllers/user.controller');

// Create an express router instance    
const router = express.Router();

/**
 * Defining routes
 *  validation in each route to validate  incoming request data and then pass it to the controller
 *  controller in each route to handle actual database deletion logic
 */

// Route for inserting new user
router.post('/insertUser',insertUserValidation,insertUserController);

// Route for updating existing user
router.put('/updateUser',updateUserValidation,updateUserController);

// Route for deleting existing user
router.delete('/deleteUser',deleteUserValidation,deleteUserController);

// Route for retrieving users
router.post('/getAllUsers',getAllUsersValidation, getAllUsersController);

// Route for authenticating user
router.post('/authenticateUser',authenticateUserValidation,authenticateUserController);

// Export router
module.exports = router;