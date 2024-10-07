# Bank Transactions Application

This application is a simple bank transaction app built with Next.js and React. It allows users to register, log in, and perform transactions (deposit, withdrawal, and transfer). The app uses MySQL for database operations and Nodemailer for sending emails.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Hooks](#hooks)
- [Endpoints](#endpoints)
- [Components](#components)
- [Dynamic Elements](#dynamic-elements)
- [To-Do and Enhancements](#to-do-and-enhancements)

## Overview
This application offers a comprehensive system for managing user accounts and transactions. Users can:
- Register and log in.
- Perform deposits, withdrawals, and transfers.
- View transaction history.
- Receive a welcome email upon successful registration.

## Features
- **User Registration and Authentication:** Users can create an account, log in, and access a personalized dashboard.
- **Dynamic Transaction Forms:** Users can deposit, withdraw, or transfer funds with real-time feedback.
- **Toasts:** Real-time notifications for success and error events using `react-hot-toast`.
- **Server-Side MySQL Database:** Stores all user data and transactions.
- **Nodemailer:** Sends a welcome email to users upon successful registration.
- **Pagination and Sorting:** Allows users to view transactions with sorting and pagination functionalities.
- **Responsive UI:** The interface is optimized for different screen sizes, ensuring a smooth user experience.

## Technologies Used
- **[Next.js (App Router)](https://nextjs.org/):** Framework for server-side rendering and static site generation.
- **[React](https://reactjs.org/):** Frontend library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Enhances JavaScript with static typing.
- **[MySQL](https://www.mysql.com/):** Database to store user and transaction data.
- **[Axios](https://axios-http.com/):** For making HTTP requests to server endpoints.
- **[Nodemailer](https://nodemailer.com/):** For sending email notifications.
- **React Hooks:** For managing component state and side effects.
- **[react-hot-toast](https://react-hot-toast.com/):** For toast notifications.
- **[GSAP](https://greensock.com/gsap/):** For animations.
- **[Tailwind CSS](https://tailwindcss.com/):** For styling and responsive design.
- **[React Icons](https://react-icons.github.io/react-icons/):** For incorporating icons into the UI.

## Project Setup
To run this project locally:
1. Clone the repository.
2. Install the dependencies:
3. npm install
4. npm run dev
5. If the .env file doesn't exist, create one in the root directory of your project and add the following environment variables:

- EMAIL_PORT=587
- EMAIL_USER=starbanktest@gmail.com
- EMAIL_PASS=imcw xckn nomj rfii
- NEXT_PUBLIC_BASE_URL=http://localhost:3000
- SQL_HOST=202.61.224.164
- SQL_USER=n1ghtw0olf
- SQL_PASS=t3r4st10s
- SQL_DB=banking_app
