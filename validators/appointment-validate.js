const {check} = require("express-validator");

/**
 * Validation middleware for inserting new appointments into the database.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `start_time`: Must be a valid time format.
 *  - `end_time`: Must be a valid time format.
 *  - `user_id`: Must not be empty.
 *  - `p_id`: Must not be empty.
 *  - `appointment_description`: Must not be empty.
 *  - `doa`: Must be a valid date format.
 */
const insertAppointmentValidation = [
   
    check( `start_time` ).isTime().withMessage("Wrong Time format"), 
    check( `end_time` ).isTime().withMessage("Wrong Time format"),
    check( `user_id` ).notEmpty().withMessage("Id is required"),
    check( `p_id` ).notEmpty().withMessage("Id is required"),
    check( `appointment_description`).notEmpty().withMessage("Description is required"),
    check(`doa`).isDate().withMessage(" Wrong Date Format "),
    
];

/**
 * Validation middleware for updating existing appointments in the database.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `start_time`: Must be a valid time format.
 *  - `end_time`: Must be a valid time format.
 *  - `user_id`: Must not be empty.
 *  - `appointment_num`: Must not be empty.
 *  - `appointment_description`: Must not be empty.
 *  - `doa`: Must be a valid date format.
 */
const updateAppointmentValidation = [
   
    check( `start_time` ).isTime().withMessage("Wrong Time format"), 
    check( `end_time` ).isTime().withMessage("Wrong Time format"),
    check( `user_id` ).notEmpty().withMessage("Id is required"),
    check( `appointment_num` ).notEmpty().withMessage("Appointment number is required"),
    check( `appointment_description`).notEmpty().withMessage("Description is required"),
    check(`doa`).isDate().withMessage(" Wrong Date Format "),
    
];

/**
 * Validation middleware for retrieving appointments from the database.
 *
 * @description Checks for the presence and validity of the following field:
 *  - `user_id`: Must not be empty.
 */
const getAppointmentsValidation = [
    check( `user_id` ).notEmpty().withMessage("Id is required")
];

/**
 * Validation middleware for deleting appointments from the database.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `user_id`: Must not be empty.
 *  - `appointment_num`: Must not be empty.
 */
const deleteAppointmentValidation  = [
    check( `user_id` ).notEmpty().withMessage("Id is required"),
    check( `appointment_num` ).notEmpty().withMessage("Appointment number is required"),
];

/**
 * Validation middleware for searching appointments for a specific patient.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `p_first_name`: Must not be empty.
 *  - `p_last_name`: Must not be empty.
 *  - `user_id`: Must not be empty.
 */
const searchAppointmentsForPatientValidation  = [
    check( `p_first_name` ).notEmpty().withMessage("First Name is required"),
    check( `p_last_name` ).notEmpty().withMessage("Last Name is required"),
    check( `user_id` ).notEmpty().withMessage("Id is required"),
];

/**
 * Validation middleware for searching appointments by date.
 *
 * @description Checks for the presence and validity of the following fields:
 *  - `user_id`: Must not be empty.
 *  - `doa`: Must be a valid date format.
 */
const searchAppointmentsByDateValidation = [
    check( `user_id` ).notEmpty().withMessage("Id is required"),
    check(`doa`).isDate().withMessage(" Wrong Date Format "),
]

// Export all validations
module.exports= {insertAppointmentValidation, deleteAppointmentValidation, getAppointmentsValidation, 
    updateAppointmentValidation,searchAppointmentsForPatientValidation,searchAppointmentsByDateValidation };

