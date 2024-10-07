The only need to do to run in is npm install and then npm run dev

Bank Transactions Application
This application is a simple bank transaction app built with Next.js and React. It allows users to register, log in, and perform transactions (deposit, withdrawal, and transfer). The app uses MySQL for database operations and Nodemailer for sending emails.

Table of Contents
Overview
Features
Technologies Used
Project Setup
Hooks
Endpoints
Components
Dynamic Elements
To-Do and Enhancements
Overview
This application offers a comprehensive system for managing user accounts and transactions. Users can:

Register and log in.
Perform deposits, withdrawals, and transfers.
View transaction history.
Receive a welcome email upon successful registration.
Features
User Registration and Authentication: Allows users to create an account, log in, and access a personalized dashboard.
Dynamic Transaction Forms: Users can deposit, withdraw, or transfer funds with dynamic feedback.
Toasts: Real-time notifications for success and error events using react-hot-toast.
Server-Side MySQL Database: All user data and transactions are stored in a MySQL database.
Nodemailer: Sends a welcome email to users upon successful registration.
Pagination and Sorting: View transactions with sorting and pagination functionalities.
Responsive UI: The user interface is optimized for different screen sizes.
Technologies Used
Next.js (App Router) - Framework for server-side rendering and static site generation.
React - Frontend library for building the user interface.
TypeScript - Enhances JavaScript with static typing.
MySQL - Database to store user and transaction data.
Axios - For making HTTP requests to the server endpoints.
Nodemailer - For sending email notifications.
React Hooks: For managing component state and side effects.
react-hot-toast - For toast notifications.
GSAP - For animations.
Tailwind CSS - For styling and responsive design.
React Icons - For using icons in the UI.
