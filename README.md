# BuildMaster

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## About

This is a project about construction management systems.

## Features

- User authentication with role-based access control.
- Project creation, update, and deletion.
- Task assignment and tracking.
- Document management for construction blueprints.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB database set up.
- API keys or credentials for any external services (e.g., Google Maps API).

### Installation

1. Clone the repository:

```
git clone https://github.com/sankhasubhraroy/BuildMaster-HyScaler-Assessment.git
```

2. Navigate to the project directory:

```
cd backend
```
```
cd frontend
```

3. Install the dependencies for both Frontend & Backend:

```
npm install
```

4. Configure environment variables for Backend:

- Create a .env file in the root directory.
- Replace with your variables

```
MONGO_URI = ***
PORT = ***
SALT_ROUNDS = ***
JWT_SECRET = ***
JWT_EXPIRES_IN = ***
```

5. Configure environment variables for Frontend:

```
GOOGLE_MAPS_API_KEY = ***
```

## Usage

1. Start the Backend server:

```
npm run dev
```

2. Start the Frontend server:

```
npm start
```

3. Open your browser and access the application at http://localhost:3000

## Project Structure

The project follows a standard MERN stack architecture:

- client: Frontend code (React).
- server: Backend code (Node.js, Express).
- models: Mongoose schemas and models.
  - Admin
  - User
  - Project
  - Task
  - Blueprint
- routes: Express routes for API endpoints.
  - localhost:5000/api
  - /auth
  - /admin
  - /user
  - /projects
  - /tasks
- controllers: Logic for handling requests and responses.
