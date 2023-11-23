// Import required modules
const express = require('express');
const { insertAppointmentValidation, deleteAppointmentValidation, getAppointmentsValidation, updateAppointmentValidation,
 searchAppointmentsForPatientValidation, searchAppointmentsByDateValidation } = require('../validators/appointment-validate');
const { insertAppointmentController,  deleteAppointmentController, getAppointmentsController, updateAppointmentController,
 searchAppointmentsForPatientController, searchAppointmentsByDateController } = require('../controllers/appointment.controller');

// Create an express router instance
const router = express.Router();

/**
 * Defining routes
 *  validation in each route to validate  incoming request data and then pass it to the controller
 *  controller in each route to handle actual database deletion logic
 */

// Route for inserting new appointments 
router.post('/insertAppointment', insertAppointmentValidation, insertAppointmentController );

// Route for deleting existing appointments
router.delete('/deleteAppointment', deleteAppointmentValidation, deleteAppointmentController);

// Route for retrieving all appointments
router.get('/getAppointments', getAppointmentsValidation, getAppointmentsController);

// Route for updating existing appointments
router.put('/updateAppointment', updateAppointmentValidation
 ,updateAppointmentController);

// Route for searching appointments for a specific patient
router.post('/searchAppointmentsForPatient', searchAppointmentsForPatientValidation, searchAppointmentsForPatientController);

// Route for searching appointments by date
router.post('/searchAppointmentsByDate', searchAppointmentsByDateValidation, searchAppointmentsByDateController);

// Export router
module.exports = router;