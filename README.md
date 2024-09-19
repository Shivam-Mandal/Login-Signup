# Signup and Login Page with Authentication and Authorization

This project is a **signup and login page** with features for **authentication and authorization** using `React`, `Node.js`, and `JWT` tokens.

## Features
- **User Signup**: New users can register by providing their details.
- **User Login**: Registered users can log in using their credentials.
- **JWT Authentication**: Secure authentication implemented using JSON Web Tokens (JWT).
- **Authorization**: Role-based access control implemented to restrict access to certain pages or features.
- **Session Management**: User sessions are maintained through tokens.
- **Protected Routes**: Only authenticated users can access certain routes in the application.

## Technology Stack
- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
   
2. Navigate to the project directory:
    ```bash
    cd signup-login-auth
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables (create `.env` file in the root directory):
    ```bash
    touch .env
    ```
    Add the following variables:
    ```env
    JWT_SECRET=your-secret-key
    MONGO_URI=your-mongodb-uri
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## API Endpoints

- **POST /signup**: Register a new user
- **POST /login**: Authenticate user and return a JWT token
- **GET /user**: Retrieve logged-in user details (protected route)

## Usage

1. **Signup**: Fill out the signup form with your username, email, and password to create a new account.
2. **Login**: Use your registered email and password to log in.
3. **Protected Pages**: After logging in, you can access the dashboard and other protected routes.

## License
This project is licensed under the MIT License.
