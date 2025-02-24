# Doctor Appointment Booking System

## Overview
The **Doctor Appointment Booking System** is a full-stack web application designed to streamline the scheduling process between patients and doctors. It provides distinct interfaces and functionalities for patients, doctors, and administrators, ensuring a seamless and efficient experience for all users.

## Features

### Patient Portal
- User registration
- View doctor profiles and their availability
- Book, reschedule, or cancel appointments

### Doctor Dashboard
- Manage personal profile and availability
- View and manage appointments
- Set appointment slots (prevents double-booking and notifies if a slot is already booked)

### Appointment Scheduling
- The system prevents double-booking by checking doctor availability before confirming appointments.

### Time Zone Handling
- All appointment times are managed in the server's local time zone to maintain consistency.

### Scalability
- The application is designed with a modular architecture, allowing for easy scalability and maintenance.

---

## Installation and Running the Application

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **MongoDB** (v4.x or later)

### Setup Steps
1. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Configure environment variables:
   - Create a `.env` file in the backend directory and add necessary environment variables such as:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5004
     ```
3. Start the backend server:
   ```sh
   npm start
   ```
4. Install frontend dependencies:
   ```sh
   cd ../frontend
   npm install
   ```
5. Start the frontend server:
   ```sh
   npm start
   ```
6. Open the application in your browser at `http://localhost:3000`

---

## Code Organization and Documentation

### Backend
- All server-side code is located in the `backend` directory.
- The code follows the **MVC (Model-View-Controller) pattern**.
- **API routes** are defined in the `routes` folder.
- **Controllers** handle business logic and are located in the `controllers` folder.
- **Models** representing database schemas are in the `models` folder.

### Frontend
- Client-side code resides in the `frontend` directory.
- Components are organized into functional units within the `src/components` folder.
- Pages corresponding to different routes are in the `src/` folder.
- State management is implemented using React's **State**.

---

## Styling and UI
- The UI is styled using **CSS**
---

## Contributing
We welcome contributions! To contribute:
1. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
2. Make your changes and commit them:
   ```sh
   git commit -m "Added a new feature"
   ```
---

## Contact
For any issues or inquiries, feel free to reach out at **chandrashekarp7769@gmail.com** or create an issue on GitHub.

---

### Happy Coding! 🚀

