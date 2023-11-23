# schedular_app_CSIS228

Welcome to the schedular_app_CSIS228 API Backend repository!This API provides a comprehensive set of endpoints for managing appointments in a healthcare setting. It enables users to create, read, update, and delete appointments, users and patients , as well as search for appointments by date or patient information. The API is built using Express, a popular Node.js framework, and utilizes various dependencies to ensure its functionality and security.

![Logo](https://live.staticflickr.com/65535/53345272379_b9f671c234_c.jpg)


## Table of Contents
- [Getting Started](#getting-started)
- [ERD Schema Description](#erd-schema-description)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Development](#development)
- [Example](#example)
- [License](#license)

## Getting Started

Follow these steps to get your Node.js API Backend up and running:

### Installation

1. Clone this repository to your local development environment:
   ```bash 
   git clone https://github.com/GhinaBouGhannam/schedularapp_CSIS228
   ```
2. Install all dependencies 
 ```bash
 npm install 
 ```  
3. Create a ```.env ``` file in the project root directory and add your environment variables as database connection details , admin username and password, and port number.
4. Run ```npm run dev``` to listen to the API on port

The API server will start listening on port 3001 by default. You can access the API endpoints using tools like Postman.

## ERD Schema Description

![ERD Screenshot]( https://live.staticflickr.com/65535/53344031277_687e4c7eb6_z.jpg )

This entity-relationship diagram (ERD) depicts a database system for managing patient 
appointments for the doctor.
*  The included attributes for the Patient entity helps to know all details about the patient as name and the contact information. 
* The included attributes of the appointment entity states the data needed for scheduling appointment as date and time.
* The included attributes for User entity helps to log in their accounts to use the app securely.
 A patient can have many appointments, but an appointment has only one patient. 
 
 A user can have many appointments, but an appointment has only one user.

## Project Structure

### Project Root Directory

* `controllers` Directory housing controller files for handling API endpoints
   
   Each API controller file handles a specific group of related API endpoints. The file typically includes:

     1. Import statements for required modules, such as Express, and services
     
     2. Request validation using libraries like express-validator  to ensure data integrity

     3. Extraction of request parameters and body data

     4. Calls to corresponding service functions to perform business logic and database operations

     5. Return of appropriate responses, including success messages, error messages, and JSON data


* `database` Directory containing configuration files as database connection details
      
      1. Import statements for required modules, such as Express, and .env
      2. Establish database connection 
      3. create a query function to write sql queries 
     

* `routes` Directory containing route files defining API endpoint mappings
     
     Each API route file defines mappings between specific API endpoints , validator and controller functions.
      
      1. Import statements for required modules, such as Express validators and controllers

      2. Route definitions using Express router methods (e.g., `get` , `post`, `put`, `delete`)

      3. Mapping of each route to the corresponding controller function

* `services` Directory housing service files encapsulating business logic related to database operations
      
      1. Import statements for required modules, such as database connection objects `query`
      
      2. Definition of service functions with clear naming conventions and documentation
      
      3. Implementation of business logic using appropriate database operations, and error handling

* `validators` Directory to validate data from the user
       
      1. Import statements for required modules, such as express validator

      2. Use functions in express-validator to ensure the data is written in the correct format for the database 

      3. Return errors n array to the controller

* `.env` Environment variable file containing sensitive configuration details
     
     Configuration files store application-specific settings and typically follow a structured format (YAML) including: 

      1. Database connection details (host, username, password, database name)
      
      2. Authentication settings (admin credentials)

* `index.js` Entry point for the API, initializing the server, database connection, and routing logic

* `package.json` Project manifest file listing dependencies, scripts, and other project metadata

* `README.md` Project documentation file explaining the project overview, installation instructions, API usage, and configuration details

## Configuration

### Environment Variables

 To run this project, you will need to add the following environment variables to your .env file

 `PORT` : The port on which the API server will listen (default: 3001)
 `DB_HOST`: The database host (default: localhost)

 `DB_USER`: The database username (default: root)

 `DB_PASS`: The database password (default: root)

 `DB_NAME`: The database name (default: docs_docket)

 `ADMIN`: The admin username (default: admin_secure_123456)

 `ADMIN_PASSWORD`: The admin password (default: 865122%h4rdP05sw0rd!)


 * Load environment variables: In your Node.js application, load the environment variables from the .env file using a package like dotenv. This package allows you to access environment variables using the ```process.env``` object.

 * Establish database connection: Import the database driver for your chosen database as mysql2 for MySQL and use the connection details from the environment variables to create a connection to the database.

* Use database connection: Once you have established a database connection, you can use it to execute SQL queries, retrieve data, and perform other database operations.


## Dependencies
 
 The project relies on the following dependencies

  ```body-parser```: Parses incoming request bodies into JSON or form objects.

  ```cors```: Enables Cross-Origin Resource Sharing (CORS), allowing requests from different origins.

  ```dotenv```: Loads environment variables from a .env file.

  ```express```: A popular Node.js framework for building web applications.

  ```express-validator```: Provides input validation middleware for Express applications.

  ```moment```: A JavaScript library for working with dates.

  ```mysql2```: A Node.js driver for connecting to MySQL databases.
  
  ```nodemon```: A tool that automatically restarts the development server when file changes are detected.


## Development
   1. API provides endpoints for managing appointments :
       ```/api/appointments``` calls the appointment routes

      * `/insertAppointment` route that calls validator to validate data inserts an appointment through the controller that calls services to insert the appointment in the database

      * `/deleteAppointment` route that calls validator to validate data deletes an appointment through the controller that calls services to delete the appointment in the database

      * `/getAppointments` route that calls validator to validate data gets all appointments through the controller that calls services to get the appointments for specific user in the database

      * `/updateAppointment` route that calls validator to validate data updates an appointment through the controller that calls services to insert the appointment in the database
      
      * `/searchAppointmentsForPatient` route that calls validator to validate data searches appointments through the controller that calls services search appointments for specific patient in the database

      * `/searchAppointmentsByDate` route that calls validator to validate data searches appointments through the controller that calls services search appointments for specific date in the database
   
   2. API provides endpoints for managing patients :
       ```/api/patients``` calls the appointment routes

      * `/insertPatient` route that calls validator to validate data inserts a patient through the controller that calls services to insert the patient in the database

      * `/deletePatient` route that calls validator to validate data deletes a patient through the controller that calls services to delete the patient in the database

      * `/getPatients` route that calls validator to validate data gets all patients through the controller that calls services to get the patients for specific user in the database

      * `/updatePatient` route that calls validator to validate data updates a patient through the controller that calls services to insert the patient in the database
      
      * `/searchPatient` route that calls validator to validate data searches patients through the controller that calls services search patients by name in the database
   

   3. API provides endpoints for managing users :
       ```/api/users``` calls the appointment routes

      * `/insertUser` route that calls validator to validate data inserts a user through the controller that calls services to insert the user in the database

      * `/deleteUser` route that calls validator to validate data deletes a user through the controller that calls services to delete the user in the database

      * `/getAllUsers` route that calls validator to validate data gets all users through the controller that calls services to get the users for admin in the database

      * `/authenticateUser` route that calls validator to validate data authenticates a user through the controller that calls services to authenticate the user to enter system


## Example
   We use postman to run the API :

   * To insert a new user to the app:
   1. Write the route : http://localhost:3001/api/users/insertUser
   2. Go to the body -> raw -> JSON
   3. Add JSON object as follow:
  ```bash  
    "user_name": "rayan",
    "password": "Rayan2003$",
    "user_email": "rayan@gmail.co",
    "user_description":  "dentist"
  ```
   
   4. Press `Send` to return the `user_id` as follow
     ```{ "user_id" : 1 }```


## License

[MIT](https://choosealicense.com/licenses/mit/)


