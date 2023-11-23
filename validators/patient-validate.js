const {check} = require("express-validator");

/**
 * Validation middleware for inserting new patients into the database.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `p_first_name`: Must not be empty.
 *  - `p_last_name`: Must not be empty.
 *  - `dob`: Must be a valid date format.
 *  - `phone_number`: Must be a valid mobile phone number format.
 *  - `p_email`: Must be a valid email address format.
 */
const insertPatientValidation = [
    check( `p_first_name` ).notEmpty().withMessage("First Name is required"),
    check( `p_last_name` ).notEmpty().withMessage("Last Name is required"),
    check(`dob`).isDate().withMessage(" Wrong Date Format "),
    check(`phone_number`).isMobilePhone().withMessage(" Wrong Phone Format "),
    check( `p_email` ).isEmail().withMessage("Wrong Email format"),
];

/**
 * Validation middleware for deleting existing patients from the database.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `id`: Must not be empty.
 *  - `user_id`: Must not be empty.
 */
const deletePatientValidation = [
    check( `id` ).notEmpty().withMessage(" Id is required"),
    check(`user_id`).notEmpty().withMessage("Id is required")
];

/**
 * Validation middleware for updating existing patients in the database.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `p_id`: Must not be empty.
 *  - `user_id`: Must not be empty.
 *  - `p_first_name`: Must not be empty.
 *  - `p_last_name`: Must not be empty.
 *  - `p_email`: Must be a valid email address format.
 *  - `dob`: Must be a valid date format.
 *  - `phone_number`: Must be a valid mobile phone number format.
 */
const updatePatientValidation = [
    check(`p_id`).notEmpty().withMessage("Id is required"),
    check(`user_id`).notEmpty().withMessage("Id is required"),
    check( `p_first_name` ).notEmpty().withMessage("First Name is required"),
    check( `p_last_name` ).notEmpty().withMessage("Last Name is required"),
    check( `p_email` ).isEmail().withMessage("Wrong Email format"),
    check(`dob`).isDate().withMessage(" Wrong Date Format "),
    check(`phone_number`).isMobilePhone().withMessage(" Wrong Phone Format "),
];

/**
 * Validation middleware for retrieving patients from the database.
 *
 * @description Checks for the presence and validity of the following field:
 *  - `user_id`: Must not be empty.
 */
const getPatientsValidation = [
    check( `user_id` ).notEmpty().withMessage(" Id is required"),
];

/**
 * Validation middleware for searching patients by name.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `user_id`: Must not be empty.
 *  - `p_first_name`: Must not be empty.
 *  - `p_last_name`: Must not be empty.
 */
const searchPatientNameValidation =[
    check(`user_id`).notEmpty().withMessage("Id is required"),
    check( `p_first_name` ).notEmpty().withMessage("First Name is required"),
    check( `p_last_name` ).notEmpty().withMessage("Last Name is required")
]

// Export all validations
module.exports ={getPatientsValidation, insertPatientValidation,updatePatientValidation,
     deletePatientValidation,searchPatientNameValidation }