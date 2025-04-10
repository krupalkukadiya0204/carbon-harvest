# CarbonHarvest Project

## Overview
CarbonHarvest is a comprehensive platform aimed at empowering farmers, industries, and regulators in India to achieve a net-zero future through the trading of carbon credits. The application facilitates user onboarding, project registration, and compliance monitoring while ensuring transparency and usability.

## Project Structure
The project is divided into two main parts: the backend and the frontend.

### Backend
- **controllers/**: Contains logic for handling user-related requests.
  - `userController.js`: Manages user registration, retrieval, and updates.
  
- **models/**: Defines the data schema for MongoDB.
  - `userModel.js`: Exports the User model with properties like name, location, mobile, and userType.
  
- **routes/**: Sets up API endpoints.
  - `userRoutes.js`: Defines routes for user registration and retrieval.
  
- **config/**: Contains configuration files.
  - `db.js`: Manages the connection to the MongoDB database.
  
- `server.js`: Entry point for the backend application, setting up the Express server and middleware.
- `package.json`: Lists dependencies and scripts for the backend application.

### Frontend
- **public/**: Contains static files.
  - `index.html`: Main HTML file for the React application.
  - `favicon.ico`: Favicon for the website.
  
- **src/**: Contains React components and application logic.
  - **components/**: Individual components for different user roles.
    - `FarmerDashboard.js`: Displays farmer project overview and actions.
    - `IndustryDashboard.js`: Shows emissions overview and compliance tools.
    - `RegulatorDashboard.js`: Provides compliance monitoring tools.
    - `LandingPage.js`: Displays the landing page content.
    - `Registration.js`: Handles user onboarding.
    - `ProjectRegistration.js`: Guides farmers through project registration.
  - `App.js`: Main application component for routing.
  - `index.js`: Entry point for the React application.
  - `App.css`: Styles for the App component.
  - `index.css`: Global styles for the frontend application.
  
- `package.json`: Lists dependencies and scripts for the frontend application.

## Features
- User onboarding for farmers, industries, and regulators.
- Real-time data tracking for carbon credits and emissions.
- Compliance tools for industries and regulators.
- A marketplace for buying and selling carbon credits.
- Responsive design for optimal user experience across devices.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

### Backend
- `MONGO_URI`: MongoDB connection string
- `PORT`: Port for the backend server (default: 5000)
- `JWT_SECRET`: Secret key for JSON Web Token (JWT) authentication

### Frontend
- `REACT_APP_API_URL`: URL for the backend API (e.g., `http://localhost:5000`)

## Getting Started
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```
3. Set up the MongoDB database and update the connection string in `config/db.js`.
4. Start the backend server:
   ```
   npm start
   ```
5. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```
6. Start the frontend application:
   ```
   npm start
   ```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.