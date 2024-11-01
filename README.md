# node-inventory-management-system

# Project Setup & Guidelines to Execute

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Node.js and npm installed
- MongoDB account for database connection URI

### Project Setup

1. **Clone the Repository**  
   Clone this repository to your local machine and navigate into the project directory.

2. **Install Dependencies**

   - Navigate to the server folder and install dependencies:
     ```bash
     cd server
     npm install
     ```
   - Navigate to the client folder and install dependencies:
     ```bash
     cd client
     npm install
     ```

3. **Environment Variables**  
   In the `server` folder, create a `.env` file with the following environment variables:
   ```plaintext
   MONGODB_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret Key>
   ```

## Running the Application

The frontend and backend run on separate terminals. Make sure you are in the correct directory when running these commands.

### Run the Backend (Server)

In the `server` folder, start the backend server:

- **With Node:**
  ```bash
  npm start
  ```
- **With Nodemon (for automatic restarts on file changes):**
  ```bash
  npm run server
  ```
  The backend will run on `http://localhost:4000`

### Run the Frontend (Client)

In a new terminal navigate to the `client` folder and start the frontend:

```bash
  cd client
  npm start
```

The frontend will run on `http://localhost:3000`

### Accessing the Application

#### Dummy User Logins

Use the following credentials to log in as different types of users:

- **Non-Admin Users**

  - Username: `bari`, Password: `password123`
  - Username: `shafquat`, Password: `password123`

- **Admin Users**
  - Username: `admin`, Password: `password123`
  - Username: `admin2`, Password: `password123`
