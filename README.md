# Real Estate Listing Application

This is a full-stack real estate listing application that allows users to create, update, and view property listings. It uses a combination of React, Redux, Tailwind CSS on the frontend, and Node.js, Express, and MongoDB on the backend.

## Table of Contents

- [Real Estate Listing Application](#real-estate-listing-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [User Routes](#user-routes)
    - [Listing Routes](#listing-routes)
  - [License](#license)

## Features

- User authentication
- Create, update, and view property listings
- Image upload functionality with file validation
- Dark mode support
- Responsive design

## Technologies

### Frontend

- React
- Redux & @reduxjs/toolkit
- React Router
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm or yarn
- MongoDB

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/real-estate-listing.git
    cd real-estate-listing
    ```

2. Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend

1. Navigate to the frontend directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

2. Start the frontend development server:
    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to view the application.

2. Register a new account or log in with existing credentials.

3. Create, update, and view property listings.

## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user

### Listing Routes

- `POST /api/listings/create`: Create a new listing
- `GET /api/listings/get/:id`: Get a specific listing
- `PUT /api/listings/update/:id`: Update a listing
- `DELETE /api/listings/delete/:id`: Delete a listing
- `POST /api/listings/upload`: Upload listing images

## License

This project is licensed under the MIT License.
