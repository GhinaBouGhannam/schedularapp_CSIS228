const {check} = require("express-validator");
require('dotenv').config();

/**
 * Validation middleware for inserting new users into the database.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `user_name`: Must not be empty.
 *  - `password`: Must be at least 6 characters long.
 *  - `password`: Must contain a combination of lowercase, uppercase, numbers, and special characters.
 *  - `user_email`: Must be a valid email address format.
 *  - `user_description`: Must not be empty.
 */
const insertUserValidation = [
    check( `user_name` ).notEmpty().withMessage("Name is required"),
    check( `password` ).isLength({min: 6}).withMessage("Your password is too short"),
    check( `password` ).isStrongPassword().withMessage("Use combination of lower case, uppercase, numbers and special characters for your password"),
    check( `user_email` ).isEmail().withMessage("Wrong Email format"),
    check( `user_description` ).notEmpty().withMessage("Description is required"),
];

/**
 * Validation middleware for deleting existing users from the database.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `user_id`: Must not be empty.
 */
const deleteUserValidation = [
    check( `user_id` ).notEmpty().withMessage(" Id is required"),
];

/**
 * Validation middleware for updating existing users in the database.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `user_id`: Must not be empty.
 *  - `user_name`: Must not be empty.
 *  - `password`: Must be at least 6 characters long.
 *  - `password`: Must contain a combination of lowercase, uppercase, numbers, and special characters.
 *  - `user_email`: Must be a valid email address format.
 *  - `user_description`: Must not be empty.
 */
const updateUserValidation = [
    check(`user_id`).notEmpty().withMessage("Id is required"),
    check( `user_name` ).notEmpty().withMessage("Name is required"),
    check( `password` ).isLength({min: 6}).withMessage("Your password is too short"),
    check( `password` ).isStrongPassword().withMessage("Use combination of lower case, uppercase, numbers and special characters for your password"),
    check( `user_email` ).isEmail().withMessage("Wrong Email format"),
    check( `user_description` ).notEmpty().withMessage("Description is required"),
];

/**
 * Validation middleware for authenticating users.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `user_name`: Must not be empty.
 *  - `password`: Must not be empty.
 */
const authenticateUserValidation =[
    check( `user_name` ).notEmpty().withMessage(" User name is required"),
    check( `password` ).notEmpty().withMessage("Password is required"),
];

/**
 * Validation middleware for checking administrator credentials before retrieving all users.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `user_name`: Must not be empty.
 *  - `password`: Must not be empty.
 */
const getAllUsersValidation = [
    check( `user_name` ).notEmpty().withMessage(" User name is required"),
    check( `password` ).notEmpty().withMessage("Password is required"),
]

// Export all validations
module.exports ={ insertUserValidation,updateUserValidation,deleteUserValidation,
    authenticateUserValidation, getAllUsersValidation};

