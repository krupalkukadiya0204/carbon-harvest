# Carbon Harvest Frontend

## Overview
The Carbon Harvest frontend is a React-based application designed to facilitate user interactions for farmers, industries, and regulators in the carbon credit marketplace. This application aims to empower users by providing them with tools to manage their carbon credits, track emissions, and ensure compliance with regulations.

## Project Structure
```
carbon-harvest
├── frontend
│   ├── public
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src
│   │   ├── components
│   │   │   ├── FarmerDashboard.js
│   │   │   ├── IndustryDashboard.js
│   │   │   ├── RegulatorDashboard.js
│   │   │   ├── LandingPage.js
│   │   │   ├── Registration.js
│   │   │   └── ProjectRegistration.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-repo/carbon-harvest.git
   ```
2. Navigate to the frontend directory:
   ```
   cd carbon-harvest/frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application
To start the development server, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

## Features
- **User Onboarding**: Seamless registration process for farmers, industries, and regulators.
- **Dashboards**: Role-specific dashboards providing insights and actions relevant to each user type.
- **Marketplace**: A platform for buying and selling carbon credits.
- **Real-time Data**: Integration with IoT devices for live updates on soil and weather metrics.

## Technologies Used
- React
- JavaScript
- Bootstrap
- CSS
- MongoDB

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.