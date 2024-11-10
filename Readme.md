# Crombie Challenge - React - Express - Typescript 

## Overview
This is a Full-Stack Web Application featuring a session management system with a registration form, login form, and secure user data access protected via JWT, developed as part of the Crombie Challenge. The application implements web accessibility practices.

## Accessibility Features
- ARIA labels and roles implemented throughout all forms and components
- Semantic HTML structure with proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly form fields and alerts
- Focus management for interactive elements
- Descriptive error messages
- Input labels and instructions

## Frontend Features
- Responsive form layouts using Material-UI components
- Input constraints for user registration with Yup form validation
- Login system
- Protected Home User information display
- Custom modular typed components
- Form field persistence for incomplete registrations
- Date picker for date of birth (+18 check)
- Success/error alerts with automatic navigation
- Form reset functionality
- Copy-to-clipboard functionality for user information

## Backend Features
- Authentication & Security with JWT, session expiration
- User password encryption using bcrypt
- Middleware for route protection and token verification
- Neon Serverless PostgreSQL
- No duplicated Users allowed via email check
- Endpoints /login - User login | /register - New user registration | /home - Protected route for retrieving user data
- Data Validation & Error Handling

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- TypeScript

## Required Environment Variables

### Frontend (Front/.env)
```env
REACT_APP_API_BASE_URL=your_api_url
```

### Backend (API/.env)
```env
PORT=3001
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
CORS_ORIGIN=your_frontend_url
```

## Available Scripts for both Front and Back

```bash
npm run dev      # Start development server
npm run build    # Build application for production
```

## Frontend Installation

```bash
# Navigate to frontend directory
cd Front

# Install dependencies
npm install
```

### Main Frontend Dependencies
```json
{
  "@emotion/react": "^11.13.3",
  "@emotion/styled": "^11.13.0",
  "@hookform/resolvers": "^3.9.1",
  "@mui/material": "^6.1.6",
  "@mui/x-date-pickers": "^7.22.1",
  "dayjs": "^1.11.13",
  "mui-tel-input": "^6.0.1",
  "react": "^18.3.1",
  "react-hook-form": "^7.53.1",
  "react-router-dom": "^6.28.0",
  "yup": "^1.4.0"
}
```

## Backend Installation

```bash
# Navigate to backend directory
cd API

# Install dependencies
npm install
```

### Main Backend Dependencies
```json
{
  "@neondatabase/serverless": "^0.10.3",
  "bcrypt": "^5.1.1",
  "cors": "^2.8.5",
  "express": "^4.21.1",
  "jsonwebtoken": "^9.0.2"
}
```
## Configure Database (Only if it's not already created):

```bash
# Run database creation script a single time
ts-node createDb.ts
```