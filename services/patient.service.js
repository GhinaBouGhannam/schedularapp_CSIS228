// Import the database query function to enter queries and fetch data from the database  
const { query } = require("../database/db");

// Import the moment.js library for the date to save and display in the correct format
var moment = require("moment");


/**
 * Define a function to insert a new patient into the database
 * @param {VarChar} p_first_name takes the first name of patient 
 * @param {VarChar} p_last_name takes the last name of patient 
 * @param {VarChar} p_email takes the email of patient 
 * @param {DateTime} dob takes the date of birth of the patient
 * @param {VarChar} phone_number takes the phone number of patient 
 * @returns the record of new patient inserted by the user
 */

const insertPatient = async(p_first_name, p_last_name,p_email,dob,phone_number) =>{
  // try-catch to handle any error that may occur
  try{
    // Create an SQL statement to insert the new patient record for specific user
    let sql = `INSERT INTO patient (p_first_name, p_last_name,dob,p_email,phone_number) VALUES (?,?,?,?,?)`;
        
    // Execute the SQL statement and store the response
    const response = await query(sql,[p_first_name, p_last_name, moment(dob).format("YYYY-MM-DD"), p_email, phone_number]);
        
    //Query the database to return for the user the full patient record
    var patient = await query(`SELECT * FROM patient WHERE p_id =?`,[response?.insertId]); 

    // Format the patient's date of birth using moment.js
    patient[0].dob= moment(patient[0].dob).format("YYYY-MM-DD");

    // Return the patient record
    return patient;
  } 
  catch(error){
    // display in the  terminal that error occured 
    res.status(500).json({message: "Internal Error Occured"});

    // throw new error to the controller to detect the occurence of error
    throw new Error(error);
  }
}

/** 
 * Define a function to delete a patient from the database 
 * @param {int} id 
 * @param {int} user_id
 * @returns the record of the patient deleted for specific user
 */
const deletePatient = async(user_id, id) =>{
  // try-catch to handle any error that may occur
  try{ 
    // Query the database to get the full patient record 
    var patient = await query(`SELECT * FROM patient NATURAL JOIN appointment WHERE appointment.user_id=? AND  p_id =?`,[user_id, id]); 
    if(patient.length === 0){
      return " No patient with such ID ";
    }
    // Format the patient's date of birth using moment.js  
    patient.dob= moment(patient.dob).format("YYYY-MM-DD");
    
    // Create an SQL statement to delete the patient record
    let sql = `DELETE FROM patient WHERE p_id =?`;
    
    // Execute the SQL statement and store the response   
    const response = await query(sql,[id]);
    
    // Return the record saved before deleting the patient
    return patient;

  }
  catch (error){
    // display in the  terminal that error occured 
    res.status(500).json({message: "Internal Error Occured"});
    
    // throw new error to the controller to detect the occurence of error  
    throw new Error(error);
  }
}

/**
 * This function updates the information of an existing patient in the database.
 *
 * @param {number} p_id The ID of the patient to update.
 * @param {string} p_first_name The new first name of the patient.
 * @param {string} p_last_name The new last name of the patient.
 * @param {string} p_email The new email address of the patient.
 * @param {string} dob The new date of birth of the patient.
 * @param {string} phone_number The new phone number of the patient.
 * @param {number} user_id The ID of the logged-in user.
 * @returns {object} The updated patient object.
 */
const updatePatient = async (p_id, p_first_name, p_last_name, p_email, dob, phone_number, user_id) => {
  try {
    // Construct the SQL query to update the patient's information.
    let sql = `UPDATE patient JOIN appointment ON appointment.p_id = ? SET p_first_name =?, p_last_name=?,phone_number =?,p_email=?,dob=? 
    WHERE user_id=? AND patient.p_id =?`;

    // Execute the query and update the patient's information in the database.
    const response = await query(sql, [p_id,p_first_name,p_last_name, phone_number, p_email,moment(dob).format("YYYY-MM-DD"), user_id, p_id]);

    // Retrieve the updated patient information from the database.
    var patient = await query(`SELECT p_first_name,p_last_name, phone_number, p_email, dob FROM patient NATURAL JOIN appointment 
    WHERE patient.p_id =? AND user_id =? `, [p_id,user_id]);

    // Check if the patient exists.
    if (patient.length === 0) {
      return "No patient with such ID.";
    }

    // Format the date of birth field.
    patient[0].dob = moment(patient[0].dob).format("YYYY-MM-DD");

    // Return the updated patient object.
    return patient;
  }
  catch (error) {
    // Handle any errors that occur during the update process.
    res.status(500).json({ message: "Internal Error Occured" });
    throw new Error(error); // throw error
  }
}

/**
 * Retrieves patient information associated with the provided user ID.
 *
 * @param {int} user_id The ID of the user to retrieve patient information for.
 * @returns The retrieved patient information, or an error message if an error occurs.
 */    
const getPatients = async (user_id) => {
  try {
    // Construct SQL query to retrieve patient information
    let sql = `
      SELECT p_first_name, p_last_name, p_email, dob, phone_number
      FROM patient
      NATURAL JOIN appointment
      WHERE appointment.user_id = ?
    `;

    // Execute the query using the provided user ID
    const response = await query(sql, [user_id]);

    // Return the retrieved patient information
    return response;
  }
  catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: "Internal Error Occured" });
    throw new Error(error); // throw error
  }
}

/**
 * Searches for patients based on their first name and last name, associated with the provided user ID.
 *
 * @param {string} p_first_name The patient's first name to search for.
 * @param {string} p_last_name The patient's last name to search for.
 * @param {int} user_id The ID of the user to search patient information for.
 * @returns The retrieved patient information, or an error message if an error occurs.
 */
const searchPatientName = async (p_first_name, p_last_name, user_id) => {
  try {
    // Construct SQL query to search patients based on first name, last name, and user ID
    let sql = `
      SELECT p_first_name, p_last_name, p_email, dob, phone_number
      FROM patient
      NATURAL JOIN appointment
      WHERE appointment.user_id = "${user_id}"
      AND (p_first_name LIKE "%${p_first_name}%" OR p_last_name LIKE "%${p_last_name}%")
    `;

    // Execute the query using the provided parameters
    let response = await query(sql);

    // Check if any matching patients were found
    if (response.length === 0) {
      return "No matching patient";
    }

    // Format the date of birth
    response.dob = moment(response.dob).format("YYYY-MM-DD");

    // Return the retrieved patient information
    return response;
  } 
  catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: "Internal Error Occured" });
    throw new Error(error);
  }
}

// Export all services
module.exports ={ searchPatientName, getPatients, insertPatient, deletePatient,updatePatient}