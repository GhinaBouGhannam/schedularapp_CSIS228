// Import required modules
const express = require('express');
const { insertPatientValidation, deletePatientValidation, updatePatientValidation, searchPatientNameValidation, 
     getPatientsValidation } = require('../validators/patient-validate');
const { insertPatientController, deletePatientController, updatePatientController, searchPatientNameController,
     getPatientsController } = require('../controllers/patient.controller');

// Create an express router instance
const router = express.Router();

/**
 * Defining routes
 *  validation in each route to validate  incoming request data and then pass it to the controller
 *  controller in each route to handle actual database deletion logic
 */

// Route for inserting new patien
router.post('/insertPatient',insertPatientValidation,insertPatientController);

// Route for deleting existing patient
router.delete('/deletePatient', deletePatientValidation, deletePatientController);

// Route for updating existing patient
router.put('/updatePatient',updatePatientValidation,updatePatientController);

// Route for retrieving patients for user
router.get('/getPatients',getPatientsValidation, getPatientsController);

// Route for searching patient by name
router.post('/searchPatient', searchPatientNameValidation, searchPatientNameController);

// Export router
module.exports = router;