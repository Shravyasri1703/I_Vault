# I VAULT : User Account Management System

Hosted Link : [text](https://profvault.netlify.app/)

This is a user account management system built using React (V16+) and Vite. It allows users to create and manage accounts, log in, register, and view/edit their account information. The application uses Firebase Authentication for login and signup, Firebase Firestore for storing user data, and Firebase Storage for uploading and managing profile pictures. The state management is handled using Redux.

# Features
Registration Page: Users can create an account using their email and password.
Login Page: Users can log in using their credentials.
Profile Management: Users can view and edit their account information, including updating their profile picture.
State Management: Managed globally using Redux.

# How It Works
Authentication: Users can sign up or log in using Firebase Authentication. Once authenticated, the user's profile information is retrieved from Firestore.
Profile Management: Users can view their profile information, including their name, email, and profile picture, and update their details. Profile pictures are stored in Firebase Storage and are linked to the user's account in Firestore.
State Management: Redux handles all user state, including login/logout status and profile updates.

# Tech Stack
Frontend: React (V16+), Vite
State Management: Redux
Authentication: Firebase Authentication
Database: Firebase Firestore
File Storage: Firebase Storage
Styling: Tailwind CSS (optional or any other CSS framework)

# Project Setup
To run this project locally, follow these steps:

1. Clone the repository

```bash
    git clone https://github.com/ your-github-repository-link
    cd your-project-directory
```
2. Install Dependencies
Ensure you have Node.js installed. Then, run the following command to install the required packages:

```bash
  npm install
```

3. Set Up Firebase
You'll need to configure Firebase for this project. Here's how:

Go to the Firebase Console, create a new project, and set up Firebase Authentication (email and password), Firestore, and Storage.

Add your Firebase project credentials to a .env file in the root of the project directory. Your .env file should contain the following Firebase configuration:

```bash

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Running the Project
To run the application in development mode, use:

```bash
 npm run dev
```

This will start the development server, and you can access the application by navigating to http://localhost:5173.

# Screenshots

