// Include the `express-validator` library for request validation
const { validationResult } = require("express-validator");

// Import the appointment-related services
const { insertAppointment, deleteAppointment, getAppointments, updateAppointment, searchAppointmentsByDate, 
  searchAppointmentsForPatient } = require("../services/appointment.service");

/**
 * Inserts a new appointment into the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing the appointment data or an error message
 */
const insertAppointmentController = async(req,res) =>{
  try{
    // Validate the request body
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      // Return Bad Request error with validation errors
      return res.status(400).json({errors: errors.array()});
    }
      
    // Extract appointment data from request body
    const {doa, start_time, end_time, appointment_description,p_id,user_id} = req.body;

    // Call the appointment insertion service
    const response = await insertAppointment(doa, start_time, end_time, appointment_description,p_id,user_id);
      
    // Return successful response with appointment data
    res.status(200).json({response});
  }
  catch(error){
    // Handle internal errors and display error message
    res.status(500).json({message:"Internal Error"});
  }
}

/**
 * Deletes an existing appointment from the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing a deleted appointment data or an error message
 */
const deleteAppointmentController = async(req,res) =>{
  try{
    // Validate the request body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      // Return Bad Request error with validation errors
      return res.status(400).json({errors: errors.array()});
    }
    // Extract appointment data from request body    
    const {appointment_num, user_id} = req.body;

    // Call the appointment deletion service
    const response = await deleteAppointment(appointment_num, user_id);
  
    // Return successful response with deleted appointment data 
    res.status(200).json({response});
  }
  catch(error){
    // Handle internal errors and display error message
    res.status(500).json({message: "Internal Error Occured "});  
  }  
}

/**
 * Retrieves all appointments from the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing a list of appointments or an error message
 */
const getAppointmentsController = async(req,res)=>{
  try{
    // Validate the request body
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      // Return Bad Request error with validation errors
      return res.status(400).json({errors: errors.array()});
    }
    // Extract user data from request body    
    const {user_id} = req.body;

    // Call the appointment retrieval service
    const appointments = await getAppointments(user_id);
    
    // Return successful response with appointment list
    res.status(200).json({appointments});
  }
  catch(error){
    // Handle internal errors and display error message
    res.status(500).json({message: "Internal Error Occured "});  
  }  
}

/**
 * Updates an existing appointment in the system.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing an appointment updated or an error message
 */
const updateAppointmentController = async(req,res)=>{
  try{
    // Validate the request body
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      // Return Bad Request error with validation errors
      return res.status(400).json({errors: errors.array()});
    }
    
    // Extract appointment data from request body
    const {appointment_num, doa, start_time, end_time, appointment_description,user_id} = req.body;
    
    // Call the appointment update service
    const response = await updateAppointment(appointment_num, doa, start_time, end_time, appointment_description,user_id);
    
    // Return successful response with appointment updated
    res.status(200).json({response});
  }
  catch(error){
    // Handle internal errors and display error message
    res.status(500).json({message: "Internal Error Occured "});  
  }  
}

/**
 * Searches appointments by date.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing a list of filtered appointments or an error message
 */
const searchAppointmentsByDateController = async(req,res)=>{
  try{
    // Validate the request body
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      // Return Bad Request error with validation errors
      return res.status(400).json({errors: errors.array()});
    }
    
    // Extract search criteria from request body
    const {doa, user_id} = req.body;
    
    // Call the appointment search service
    const response = await searchAppointmentsByDate(doa, user_id);
    
    // Return successful response with filtered appointment list
    res.status(200).json({response});

  }
  catch(error){
    // Handle internal errors and display error message
    res.status(500).json({message: "Internal Error Occured "});  
  }  
}

/**
 * Searches appointments for a specific patient.
 *
 * @param {*} req The Express request object
 * @param {*} res The Express response object
 * @returns A JSON object containing a list of filtered appointments or an error message
 */
const searchAppointmentsForPatientController = async(req,res)=>{
  try{
    // Validate the request body
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      // Return Bad Request error with validation errors
      return res.status(400).json({errors: errors.array()});
    }
    
    // Extract search criteria from request body
    const {p_first_name, p_last_name,user_id} = req.body;
    
    // Call the appointment search service
    const response = await searchAppointmentsForPatient(p_first_name, p_last_name, user_id);
    
    // Return successful response with filtered appointment list
    res.status(200).json({response});

  }
  catch(error){
    // Handle internal errors and display error message
    res.status(500).json({message: "Internal Error Occured "});  
  }  
}

// Export all controllers
module.exports ={insertAppointmentController,deleteAppointmentController, getAppointmentsController,
    updateAppointmentController, searchAppointmentsByDateController,searchAppointmentsForPatientController};