# CSV File Loader

CSV File Loader is a web application that allows users to upload CSV files, which are parsed and stored in a MySQL database. The application provides functionality to retrieve and display the uploaded data with pagination.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)

## Features

- Upload CSV files
- Store parsed data in a MySQL database
- Retrieve and display data with pagination
- Error handling for duplicate entries and invalid files

## Technologies Used

- **Backend:**
  - Fastify
  - TypeORM
  - MySQL
  - Node.js

- **Frontend:**
  - Svelte
  - Axios

## Usage
  - npm install for node_modules in root/, /backend, /frontend
  - Modify mysql config in /backend/.env
  - cd root/ and npm start via concurrently