# E-Commerce Platform

## Introduction

- **Author**: Thuan Tran Van
- **Institution**: University of Information Technology (UIT), Vietnam
- **Project Name**: E-Commerce Platform
- **Created Date**: April 22, 2025
- **Description**: This project is a full-stack e-commerce application designed to provide user management, analytics dashboard, and shopping functionalities. It serves as a practical implementation for learning modern web development technologies.

## Services

The application is modularized into three main microservices, each running on a dedicated port:

- **user-3001**:
  - Manages user authentication, registration, and profile management.
  - Port: `3001`
  - Key Features: Login, signup, password reset, user profile updates.
- **dashboard-3002**:
  - Provides an analytics dashboard for administrators and users.
  - Port: `3002`
  - Key Features: Sales reports, user activity tracking, data visualization.
- **shopping-3003**:
  - Handles product browsing, cart management, and checkout processes.
  - Port: `3003`
  - Key Features: Product catalog, shopping cart, order processing.

## Tools and Technologies

- **Frontend**:
  - **React**: For building a dynamic and responsive user interface.
  - **Tailwind CSS**: For styling the frontend components.
- **Backend**:
  - **Node.js**: Runtime environment for the server-side logic.
  - **Express.js**: Framework for building RESTful APIs.
- **Database**:
  - **MongoDB**: NoSQL database for storing user data, products, and orders.
- **Other Tools**:
  - **npm**: Package manager for installing dependencies.
  - **Git**: Version control system for source code management.

## Requirements

- **Node.js**: Version 20 or higher (recommended: latest LTS version).
- **MongoDB**: Version 5.0 or higher, either locally installed or hosted (e.g., MongoDB Atlas).
- **Git**: For cloning the repository.
- **Browser**: Modern browsers like Chrome, Firefox, or Edge for accessing the frontend.

## Installation and Setup

Follow these steps to set up and run the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/thuantv-uit/NT533_MicroService_BE.git
   cd NT533_MicroService_BE
   ```

2. **Install dependencies**:

   - Ensure Node.js is installed (`node --version` to verify).

   - Run the following command in the project root:

     ```bash
     npm install
     ```

   - If the project has separate folders for each service, navigate to each service directory (`user-3001`, `dashboard-3002`, `shopping-3003`) and run `npm install` in each.

3. **Set up MongoDB**:

   - Install MongoDB locally or use a cloud-based service like MongoDB Atlas.
   - Ensure the MongoDB server is running (`mongod` for local setups).
   - Note: For MongoDB Atlas, obtain the connection string from the Atlas dashboard.

4. **Configure environment variables**:

   - Create a `.env` file in the root of each service directory (`user-3001`, `dashboard-3002`, `shopping-3003`).

   - Example `.env` file content:

     ```env
     PORT=3001
     MONGODB_URI=mongodb://localhost:27017/ecommerce
     JWT_SECRET=your_jwt_secret_key
     NODE_ENV=development
     ```

   - Replace `MONGODB_URI` with your MongoDB connection string if using a cloud database.

   - Generate a secure `JWT_SECRET` for authentication.

5. **Run the services**:

   - Start each service in a separate terminal:

     ```bash
     # User service
     cd user-3001
     npm run start
     ```

     ```bash
     # Dashboard service
     cd dashboard-3002
     npm run start
     ```

     ```bash
     # Shopping service
     cd shopping-3003
     npm run start
     ```

   - Alternatively, use a tool like `concurrently` to run all services simultaneously from the root:

     ```bash
     npm run start:all
     ```

6. **Access the application**:

   - Open your browser and navigate to:
     - User service: `http://localhost:3001`
     - Dashboard service: `http://localhost:3002`
     - Shopping service: `http://localhost:3003`
   - The frontend (React app) is typically served by the `dashboard-3002` service and integrates with the other services via API calls.

7. **Testing the application**:

   - Use tools like **Postman** or **cURL** to test API endpoints.

   - Example: To test user registration:

     ```bash
     curl -X POST http://localhost:3001/api/users/register -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass","email":"test@example.com"}'
     ```

## Troubleshooting

- **MongoDB connection issues**:

  - Verify MongoDB is running and the `MONGODB_URI` in the `.env` file is correct.
  - Check network access for cloud databases (e.g., whitelist your IP in MongoDB Atlas).

- **Port conflicts**:

  - Ensure ports `3001`, `3002`, and `3003` are not in use by other applications.
  - Change the `PORT` in the `.env` file if necessary.

- **Node version errors**:

  - Use `nvm` (Node Version Manager) to switch to Node.js 20 or higher:

    ```bash
    nvm install 20
    nvm use 20
    ```

## Contributing

- Fork the repository and create a pull request with detailed descriptions of your changes.
- Follow the coding standards (e.g., ESLint for JavaScript, Prettier for formatting).
- Contact the author for collaboration opportunities.

## License

This project is licensed under the MIT License.
