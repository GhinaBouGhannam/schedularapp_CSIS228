// Import the database query function to enter queries and fetch data from the database  
const { query } = require("../database/db");

// Import the moment.js library for the date to save and display in the correct format
var moment = require("moment");

/**
 * This function inserts an appointment into the database.
 *
 * @param {string} doa The date of the appointment.
 * @param {time} start_time The start time of the appointment.
 * @param {time} end_time The end time of the appointment.
 * @param {string} appointment_description The description of the appointment.
 * @param {number} p_id The ID of the patient.
 * @param {number} user_id The ID of the user.
 * @returns {object} The appointment object.
 */
const insertAppointment = async (doa, start_time, end_time, appointment_description, p_id, user_id) => {
  try {
    // Check if the end time is earlier than the start time.
    const time1 = start_time.split(":");
    const time2 = end_time.split(":");

   // Extract time components
   const hours1 = parseInt(time1[0]);
   const minutes1 = parseInt(time1[1]);

  const hours2 = parseInt(time2[0]);
  const minutes2 = parseInt(time2[1]);
    
  if (hours1 > hours2) {
      return "End Time can't be earlier than Start Time";
    }
    if(hours1 == hours2 && minutes1>minutes2){
      return "End Time can't be earlier than Start Time";
    }

    // Check if the start time is equal to the end time.
    if (start_time === end_time) {
      return "End Time can't be equal Start Time";
    }

    // Get the ID in the database
    const ID = await query(`SELECT * FROM patient WHERE p_id =?`,[p_id]);

    // Check if the entered ID is found
    if (ID.length===0) {
      return "Wrong patient id";
    }

    // Check if there is already an appointment assigned to the patient in another user
    let m = `SELECT * FROM appointment WHERE p_id =? AND user_id != ?`;
    var g = await query(m, [p_id, user_id]);
    if (g.length > 0) {
      return "Wrong Patient Id.";
    }

    let q = `SELECT * FROM appointment WHERE user_id =? AND doa =? 
    AND ((start_time <= ? AND end_time >=?) 
    OR (start_time >= ? AND start_time <=?) 
    OR  (end_time <=? AND end_time>= ?)
     OR ( start_time<=? AND end_time>=? ))`;
    const r = await query(q, [user_id, doa, start_time, start_time,start_time, end_time,end_time,start_time,start_time, end_time]);
    if (r.length > 0) {
      return "Appointment already assigned.";
    }

    // Insert the appointment into the database.
    let s = `INSERT INTO appointment (doa, start_time, end_time, appointment_description,p_id,user_id) VALUES (?,?,?,?,?,?)`;
    const response = await query(s,[moment(doa).format("YYYY-MM-DD"), start_time, end_time, appointment_description,p_id,user_id]);

    // Get the appointment details from the database.
    const appointment = await query(
      `SELECT p_first_name , p_last_name ,doa, start_time, end_time, appointment_description FROM appointment NATURAL JOIN patient WHERE appointment_num =?`,
      [response?.insertId]
    );

    // Format the date.
    appointment[0].doa = moment(appointment[0].doa).format("YYYY-MM-DD");

    // Return the appointment object.
    return appointment;
  } 
  catch (error) {
    // Handle internal error and return error messsage
    res.status(500).json({ message: "Internal Error Occurred" });
    throw new Error(error); // throw error 
  }
}

/**
 * This function deletes an appointment from the database.
 *
 * @param {number} appointment_num The ID of the appointment.
 * @param {number} user_id The ID of the user.
 * @returns {object} The deleted appointment object.
 */
const deleteAppointment = async (appointment_num, user_id) => {
  try {
    // Check if the appointment exists.
    var appointment = await query(`SELECT * FROM appointment WHERE user_id =? AND appointment_num =?`, [user_id, appointment_num]);
    if (appointment.length === 0) {
      return "No appointment with such number";
    }

    // Format the date.
    appointment[0].doa = moment(appointment[0].doa).format("YYYY-MM-DD");

    // Delete the appointment from the database.
    let sql = `DELETE FROM appointment WHERE user_id =? AND appointment_num =?`;
    let response = await query(sql, [user_id, appointment_num]);

    // Return the deleted appointment object.
    return appointment;
  }
   catch (error) {
    // Handle internal error and return error messsage
    res.status(500).json({ message: "Internal Error Occurred" });
    throw new Error(error); // throw error 
  }
}

/**
 * This function updates an appointment in the database.
 *
 * @param {number} appointment_num The ID of the appointment.
 * @param {string} doa The date of the appointment.
 * @param {string} start_time The start time of the appointment.
 * @param {string} end_time The end time of the appointment.
 * @param {string} appointment_description The description of the appointment.
 * @param {number} user_id The ID of the user.
 * @returns {object} The updated appointment object.
 */
const updateAppointment = async (appointment_num, doa, start_time, end_time, appointment_description, user_id) => {
  try {
   // Check if the end time is earlier than the start time.
    const time1 = start_time.split(":");
    const time2 = end_time.split(":");

   // Extract time components
   const hours1 = parseInt(time1[0]);
   const minutes1 = parseInt(time1[1]);

  const hours2 = parseInt(time2[0]);
  const minutes2 = parseInt(time2[1]);
    
  if (hours1 > hours2) {
      return "End Time can't be earlier than Start Time";
    }
    if(hours1 == hours2 && minutes1>minutes2){
      return "End Time can't be earlier than Start Time";
    }

    // Check if the start time is equal to the end time.
    if (start_time === end_time) {
      return "End Time can't be equal Start Time";
    }
 
     let q = `SELECT * FROM appointment WHERE user_id =? AND doa =? 
     AND ((start_time <= ? AND end_time >=?) 
     OR (start_time >= ? AND start_time <=?) 
     OR  (end_time <=? AND end_time>= ?)
      OR ( start_time<=? AND end_time>=? ))`;

     const r = await query(q, [user_id, doa, start_time, start_time,start_time, end_time,end_time,start_time,start_time, end_time]);
     if (r.length > 0) {
       return "Appointment already assigned.";
     }
    
    // Update the appointment in the database.
    let sql = `UPDATE appointment SET doa =?, start_time =?, end_time=?, appointment_description=? WHERE appointment_num =? AND user_id=?`;
    const response = await query(
      sql,
      [moment(doa).format("YYYY-MM-DD"), start_time, end_time, appointment_description, appointment_num, user_id]
    );

    // Check if the appointment exists.
    var appointment = await query(
      `SELECT p_first_name , p_last_name ,doa, start_time, end_time, appointment_description FROM appointment NATURAL JOIN patient 
      WHERE appointment_num =? AND user_id = ? `,
      [appointment_num, user_id]
    );
    if (appointment.length === 0) {
      return "No appointment with such number";
    }

    // Format the date.
    appointment[0].doa = moment(appointment[0].doa).format("YYYY-MM-DD");

    // Return the updated appointment object.
    return appointment;
  } 
  catch (error) {
   // Handle internal error and return error messsage
   res.status(500).json({ message: "Internal Error Occurred" });
   throw new Error(error); // throw error 
 }
}

/**
 * This function retrieves all appointments for a specific user.
 *
 * @param {number} user_id The ID of the user.
 * @returns {object} An array of appointment objects.
 */
const getAppointments = async (user_id) => {
  try {
    // Retrieve all appointments for the user from the database.
    let sql = `SELECT * FROM appointment WHERE user_id =?`;
    const response = await query(sql, [user_id]);

    // Check if there are any appointments for the user.
    if (response.length === 0) {
      return "No appointments found.";
    }
     // Format the date field of all appointments.
    for(let i=0;i<response.length;i++){
      response[i].doa = moment(response[i].doa).format("YYYY-MM-DD");}

    // Return the array of appointment objects.
    return response;
  }
   catch (error) {
   // Handle internal error and return error messsage
   res.status(500).json({ message: "Internal Error Occurred" });
   throw new Error(error); // throw error 
 }
}

/**
 * This function searches for appointments for a specific patient based on their first name and last name.
 *
 * @param {string} p_first_name The first name of the patient.
 * @param {string} p_last_name The last name of the patient.
 * @param {number} user_id The ID of the user.
 * @returns {object} An array of appointment objects.
 */
const searchAppointmentsForPatient = async (p_first_name, p_last_name, user_id) => {
  try {
    // Construct the SQL query to search for appointments for the specified patient.
    let sql = `SELECT p_first_name, p_last_name, doa, start_time, end_time, appointment_description 
              FROM patient NATURAL JOIN appointment 
              WHERE appointment.user_id = "${user_id}" 
              AND (p_first_name LIKE "%${p_first_name}%" OR p_last_name LIKE "%${p_last_name}%")`;

    // Execute the query and retrieve the results.
    let response = await query(sql);

    // Check if there are any matching appointments for the patient.
    if (response.length === 0) {
      return "No matching appointment found.";
    }
    // Format the date field of all appointments.
    for(let i=0;i<response.length;i++){
      response[i].doa = moment(response[i].doa).format("YYYY-MM-DD");}

    // Return the array of matching appointment objects.
    return response;
  }
   catch (error) {
    // Handle any errors that occur during the search process.
    res.status(500).json({ message: "Internal Error Occured" });
    throw new Error(error); // throw error
  }
}

/**
 * This function searches for appointments for a specific date for the logged-in user.
 *
 * @param {string} doa The date of the appointment.
 * @param {number} user_id The ID of the user.
 * @returns {object} An array of appointment objects.
 */
const searchAppointmentsByDate = async (doa, user_id) => {
  try {
    // Construct the SQL query to search for appointments for the specified date.
    let sql = `SELECT p_first_name, p_last_name, doa, start_time, end_time, appointment_description 
              FROM patient NATURAL JOIN appointment 
              WHERE appointment.user_id = ? 
              AND doa = ?`;

    // Execute the query and retrieve the results.
    let response = await query(sql, [user_id, doa]);

    // Check if there are any matching appointments for the date.
    if (response.length === 0) {
      return "No matching appointment found.";
    }
   
    // Format the date of all appointments.
    for(let i=0;i<response.length;i++){
    response[i].doa = moment(response[i].doa).format("YYYY-MM-DD");}

    // Return the array of matching appointment objects.
    return response;
  }
   catch (error) {
    // Handle any errors that occur during the search process.
    res.status(500).json({ message: "Internal Error Occured" });
    throw new Error(error); // throw error
  }
};

// Export all services 
module.exports ={insertAppointment,deleteAppointment,getAppointments ,updateAppointment, 
  searchAppointmentsForPatient,searchAppointmentsByDate }