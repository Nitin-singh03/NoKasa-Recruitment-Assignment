# NoKasa Recruitment Assignment

<div align="center">
  <img src="https://nokasa.co/logo.svg" alt="NoKasa Logo" width="200" height="auto">
  <br>
  <a href="https://nokasa.co">Visit NoKasa</a>
</div>

A Node.js REST API application with dual user management systems supporting both email and phone-based user registration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Security Features](#security-features)
- [Development](#development)

## Features

### Core Functionality

- **Dual API Versions**: v1 (email-based) and v2 (phone-based) user management
- **CRUD Operations**: Create, Read, Update, Delete users
- **Input Validation**: Comprehensive request validation using Joi
- **Password Security**: Bcrypt hashing with configurable salt rounds
- **Error Handling**: Centralized error handling with custom error responses
- **Logging**: Winston-based logging system
- **Health Check**: Built-in health monitoring endpoint

### Security Features

- **Password Hashing**: Secure bcrypt implementation
- **Input Sanitization**: Joi validation schemas
- **Error Handling**: Proper error responses without sensitive data exposure
- **Environment Configuration**: Secure configuration management

### Data Management

- **In-Memory Storage**: Fast Map-based data storage for demonstration
- **Data Normalization**: Email and phone number normalization
- **Duplicate Prevention**: Unique constraint enforcement
- **Data Validation**: Input format validation and sanitization

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Validation**: Joi
- **Password Hashing**: bcrypt
- **Logging**: Winston
- **Development**: Nodemon

## Project Structure

```
NoKasa Recruitment/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── v1UserController.js
│   │   └── v2UserController.js
│   ├── middlewares/          # Custom middleware
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/              # Data models and normalization
│   │   ├── emailUserModel.js
│   │   └── phoneUserModel.js
│   ├── routes/              # API route definitions
│   │   ├── v1.js
│   │   └── v2.js
│   ├── services/            # Business logic layer
│   │   └── userService.js
│   ├── utils/               # Utility functions
│   │   └── logger.js
│   ├── validators/          # Joi validation schemas
│   │   ├── v1UserSchema.js
│   │   └── v2UserSchema.js
│   └── server.js           # Application entry point
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nitin-singh03/NoKasa-Recruitment-Assignment.git
   cd "NoKasa Recruitment"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   Create a `.env` file with the required variables (see Environment Variables section)

4. **Start the application**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=200

# Security Configuration
SALT_ROUNDS=10
```

## API Documentation

### Base URL

```
http://localhost:5000
```

### Health Check

```http
GET /health
```

**Response:**

```json
{
  "success": true,
  "message": "OK"
}
```

### V1 API (Email-based Users)

#### Create User

```http
POST /v1/users
Content-Type: application/json

{
  "id": "user@example.com",
  "password": "password123"
}
```

#### Get User

```http
GET /v1/users/:email
```

#### List All Users

```http
GET /v1/users
```

#### Delete User

```http
DELETE /v1/users/:email
```

### V2 API (Phone-based Users)

#### Create User

```http
POST /v2/users
Content-Type: application/json

{
  "id": "1234567890",
  "password": "password123"
}
```

#### Get User

```http
GET /v2/users/:phone
```

#### List All Users

```http
GET /v2/users
```

#### Delete User

```http
DELETE /v2/users/:phone
```

## Usage Examples

### Creating an Email User (V1)

```bash
curl -X POST http://localhost:5000/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "john.doe@example.com",
    "password": "securepass123"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "User created",
  "data": {
    "id": "john.doe@example.com"
  }
}
```

### Creating a Phone User (V2)

```bash
curl -X POST http://localhost:5000/v2/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1234567890",
    "password": "securepass123"
  }'
```

### Retrieving User Information

```bash
# Get email user
curl http://localhost:5000/v1/users/john.doe@example.com

# Get phone user
curl http://localhost:5000/v2/users/1234567890
```

### Listing All Users

```bash
# List email users
curl http://localhost:5000/v1/users

# List phone users
curl http://localhost:5000/v2/users
```

## Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "data": {
    "errors": ["Detailed error messages"]
  }
}
```

### Common HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **404**: Not Found
- **409**: Conflict (duplicate user)
- **500**: Internal Server Error

### Validation Errors

```json
{
  "success": false,
  "message": "Validation error",
  "data": {
    "errors": [
      "id (email) is required",
      "password must be at least 6 characters long"
    ]
  }
}
```

## Security Features

### Password Security

- **Bcrypt Hashing**: All passwords are hashed using bcrypt
- **Configurable Salt Rounds**: Adjustable via environment variables
- **No Plain Text Storage**: Passwords are never stored in plain text

### Input Validation

- **Email Validation**: RFC-compliant email format validation
- **Phone Validation**: 10-15 digit numeric phone number validation
- **Password Requirements**: Minimum 6 characters
- **Request Sanitization**: All inputs are validated and sanitized

### Data Protection

- **Normalized Storage**: Email and phone numbers are normalized before storage
- **Error Message Security**: No sensitive information exposed in error messages
- **Memory-based Storage**: No persistent data storage for demonstration purposes

## Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### Code Structure Guidelines

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Models**: Define data structure and normalization
- **Validators**: Define input validation schemas
- **Middlewares**: Handle cross-cutting concerns

## API Response Standards

### Success Response

```json
{
  "success": true,
  "message": "Operation description",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "data": {
    "errors": ["Error details"]
  }
}
```

## 👨‍💻 Author

**Nitin Singh**

## Company

This project is part of the recruitment process for [NoKasa](https://nokasa.co).

---
