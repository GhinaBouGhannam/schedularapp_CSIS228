// Include the `express-validator` library for request validation
const { validationResult } = require("express-validator");
// Import the patient-related services
const {insertPatient, deletePatient, updatePatient, getPatients, 
   searchPatientName} = require("../services/patient.service");

/**
 * Inserts a new patient into the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing the patient data or an error message
 */
const insertPatientController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract patient data from request body
    const { p_first_name, p_last_name, p_email, dob, phone_number } = req.body;

    // Call the patient insertion service
    const response = await insertPatient(p_first_name, p_last_name, p_email, dob, phone_number);

    // Return successful response with patient data
    res.status(200).json({ response });
  }
   catch (error) {
    // Handle internal errors and return error message
    res.status(500).json({ message: "Internal Error" });
  }
}

/**
 * Deletes an existing patient from the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing a deleted patient data or an error message
 */
const deletePatientController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract patient ID from request body
    const { user_id,id } = req.body;

    // Call the patient deletion service
    const response = await deletePatient(user_id,id);

    // Return successful response with deleted patient data
    res.status(200).json({ response });
  } 
  catch (error) {
    // Handle internal errors and return error message
    res.status(500).json({ message: "Internal Error" });
  }
}

/**
 * Handles the updating of an existing patient record in the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing a patient update data or an error message
 */
const updatePatientController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract patient data from request body
    const { p_id, p_first_name, p_last_name, p_email, dob, phone_number, user_id } = req.body;

    // Call the patient update service
    const response = await updatePatient(p_id, p_first_name, p_last_name, p_email, dob, phone_number, user_id);

    // Return successful response with patient update confirmation
    res.status(200).json({ response });
  } 
  catch (error) {
    // Handle internal errors and return error message
    res.status(500).json({ message: "Internal Error" });
  }
}

/**
 * Retrieves all patients from the system for a specific user.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing a list of patients or an error message
 */
const getPatientsController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user ID from request body
    const { user_id } = req.body;

    // Call the patient retrieval service
    const response = await getPatients(user_id);

    // Return successful response with patient list
    res.status(200).json({ response });
  }
  catch (error) {
    // Handle internal errors and return error message
    res.status(500).json({ message: "Internal Error" });
  }
}

/**
 * Searches patients based on the specified first name and last name for a specific user.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing a list of filtered patients or an error message
 */
const searchPatientNameController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract search criteria from request body
    const { p_first_name, p_last_name, user_id } = req.body;

    // Call the patient search service
    const response = await searchPatientName(p_first_name, p_last_name, user_id);

    // Return successful response with filtered patient list
    res.status(200).json({ response });
  }
  catch (error) {
    // Handle internal errors
    res.status(500).json({ message: "Internal Error" });
  }
}

// Export all controllers
module.exports = {searchPatientNameController, getPatientsController, insertPatientController,
  updatePatientController, deletePatientController}
 