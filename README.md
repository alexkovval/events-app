# Events App

A mobile event management application built with **React Native** and **Node.js**.

The application allows users to browse available events, log in, view event details, and register for events. The backend handles event registrations and stores registered participants in a JSON file.

## Features

* User authentication
* Browse available events
* View event details
* Register for an event
* Store registered participants on the backend
* Deep linking to specific events
* REST API built with Node.js
* Cross-platform mobile application with React Native

## Tech Stack

### Mobile App

* React Native
* JavaScript / TypeScript
* React Navigation
* Axios

### Backend

* Node.js
* Express.js
* REST API
* JSON file storage

## Project Structure

```text
events-app/
├── EventApp/       # React Native mobile application
└── backend/        # Node.js backend server
```

## Getting Started

### Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
npm run dev
```

The backend server will start in development mode.

### React Native App

Navigate to the mobile application:

```bash
cd EventApp
npm install
npm run start
```

For Android:

```bash
npm run android
```

For iOS:

```bash
cd ios
pod install
cd ..
npm run ios
```

## Deep Linking

The application supports deep linking to specific events.

For Android, you can test a deep link using:

```bash
adb shell am start -W -a android.intent.action.VIEW -d "myapp://event/1" com.eventapp
```

For example, the link above opens **event #1** directly in the application.

## How It Works

1. The user opens the mobile application.
2. Available events are loaded from the backend.
3. The user can view event details and log in.
4. After logging in, the user can register for an event.
5. The registration request is sent to the Node.js backend.
6. The backend stores the participant information in a JSON file.
7. Events can also be opened directly using a deep link.

## Future Improvements

* Replace JSON file storage with a database such as PostgreSQL or MongoDB
* Add user registration and account management
* Add event creation and management
* Add validation and improved error handling
* Add automated tests
* Add authentication using JWT
