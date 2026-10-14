# Node.js Laboratory & Practical Demonstrations

A comprehensive collection of Node.js examples, tutorials, and practical scripts covering foundational server-side development concepts. This repository includes hands-on implementations of core Node.js modules, asynchronous programming paradigms, web server development with HTTP and Express.js, database integration with MongoDB, event handling, and utility services like email transmission and terminal styling.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Package Installation Commands](#package-installation-commands)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [How to Run the Project](#how-to-run-the-project)
- [Usage Instructions & Script Reference](#usage-instructions--script-reference)
- [Additional Information & Troubleshooting](#additional-information--troubleshooting)

---

## Project Overview

The primary objective of this repository is to serve as a structured learning resource and code showcase for Node.js backend development. It covers fundamental and advanced server-side topics:

- **Asynchronous Operations**: Progressive implementation of callbacks, ES6 Promises, and Async/Await using the Node.js `fs` module.
- **Web Server Development**: Building HTTP servers with Node.js built-in `http` module as well as modern routing with Express.js.
- **Database Integration**: Connecting Node.js applications to MongoDB databases using `mongoose` and managing configurations securely via `dotenv`.
- **Event-Driven Architecture**: Demonstrating custom event handling and listener execution using Node.js `EventEmitter`.
- **Modular Programming**: Exporting and importing custom helper modules using CommonJS (`module.exports` and `require`).
- **Utility Integrations**: Terminal text formatting with `chalk`, automated email sending using `nodemailer`, and dynamic URL/query parameter parsing.

---

## Key Features

- **Asynchronous File Handling**: Compare asynchronous Callbacks, Promises, and `async/await` side-by-side.
- **Express & Native HTTP Web Servers**: Native HTTP routing, parameter parsing (`urlDemo.js`), and Express route params (`app1.js`).
- **Database Connectivity**: Secure MongoDB database connection management with error handling and environment validation (`NodeJsConnection/`).
- **Event Management**: Creating event listeners and emitting domain events (`eventsDemo.js`).
- **Custom Helper Modules**: Reusable mathematical utilities for tax calculation and currency rounding (`mathHelper.js`).
- **Email Transmission**: Automated email delivery integration with Gmail SMTP via `nodemailer` (`sendEmail.js`).
- **Styled Terminal Output**: Colored and formatted terminal log messages using `chalk` (`color.js`).

---

## Technologies Used

| Category | Technology / Library | Version | Description |
| :--- | :--- | :--- | :--- |
| **Runtime Environment** | Node.js | v14.x / v18.x+ | JavaScript server-side runtime environment |
| **Package Manager** | npm | v6.x / v9.x+ | Node package manager for installing dependencies |
| **Web Framework** | Express.js | `^5.2.1` | Fast, unopinionated web framework for Node.js |
| **Database ORM** | Mongoose | `^9.11.1` | MongoDB object modeling tool designed to work in an asynchronous environment |
| **Environment Config** | dotenv | `^18.0.7` | Zero-dependency module that loads environment variables from a `.env` file |
| **Email Transport** | Nodemailer | `^10.0.13` | Module for Node.js applications to allow email sending |
| **Console Styling** | Chalk | `^4.1.2` | Terminal string styling library |
| **Core Node Modules** | `http`, `fs`, `events`, `url` | Built-in | Native Node.js standard modules |

---

## Prerequisites

Before running the project, ensure you have the following software installed on your machine:

1. **Node.js**: Version 14.x, 18.x, or higher. You can check your version by running:
   ```bash
   node -v
   ```
2. **npm** (Node Package Manager): Installed automatically with Node.js. Check version with:
   ```bash
   npm -v
   ```
3. **MongoDB Instance** *(Optional, required for `NodeJsConnection/`)*: A local MongoDB server or a remote MongoDB Atlas connection URI string.

---

## Installation and Setup

Follow these step-by-step instructions to clone and set up the repository:

### Step 1: Clone the Repository
Open your terminal or command prompt and clone the repository:
```bash
git clone https://github.com/shiraz-07/nodejs.git
```

### Step 2: Navigate to the Project Directory
```bash
cd nodejs
```

### Step 3: Install Root Dependencies
Install all required packages declared in the root `package.json`:
```bash
npm install
```

### Step 4: Install Subfolder Dependencies (For MongoDB Connection)
Navigate to the `NodeJsConnection` directory and install its specific dependencies:
```bash
cd NodeJsConnection
npm install
cd ..
```

---

## Package Installation Commands

If you need to install the dependencies manually or add individual packages, use the following commands:

### Root Level Dependencies
```bash
# Install all dependencies defined in root package.json
npm install

# Install individual packages manually (if setting up from scratch)
npm install express@^5.2.1
npm install chalk@^4.1.2
npm install nodemailer@^10.0.13
```

### Subdirectory (`NodeJsConnection`) Dependencies
```bash
# Navigate to subfolder
cd NodeJsConnection

# Install subfolder dependencies
npm install

# Install individual packages manually
npm install dotenv@^18.0.7
npm install mongoose@^9.11.1
```

---

## Project Structure

```
nodejs/
├── NodeJsConnection/          # Sub-project for Database Connection
│   ├── Connection.js           # Mongoose MongoDB connection script with dotenv
│   ├── package.json           # Sub-project dependencies (dotenv, mongoose)
│   └── package-lock.json      # Sub-project package lock file
├── .gitignore                 # Files and folders ignored by Git
├── README.md                  # Project documentation
├── app.js                     # Example importing custom helper module (mathHelper)
├── app1.js                    # Express.js server example with route parameters
├── asyncAwaitDemo.js          # Async/Await file reading example (multiple files)
├── asyncAwaitDemo1.js         # Async/Await file reading example (single file)
├── callbackDemo.js            # Asynchronous file reading using callback pattern
├── color.js                   # Terminal text formatting demonstration using Chalk
├── eventsDemo.js              # Event-driven programming example with EventEmitter
├── global.js                  # Demonstrating Node.js global variables and timers
├── grade.js                   # Control flow, array iteration, and function example
├── hello.js                   # Starter script printing greeting to console
├── mathHaler.js               # Utility module exporting financial calculation methods
├── mathHelper.js              # Utility module exporting math functions (addTax, roundMoney)
├── notes.txt                  # Sample text file used in file system demonstrations
├── package-lock.json          # Root lockfile for dependency versions
├── package.json               # Root project manifest and dependency definitions
├── promisDemo.js              # File reading example using Promises (`fs.promises`)
├── promisDemo1.js             # Secondary file reading example using Promises
├── promises.txt               # Sample text file used in Promise demonstrations
├── sendEmail.js               # Automated email dispatch script using Nodemailer
├── server.js                  # HTTP web server created with core `http` module (Port 5000)
├── server1.js                 # HTTP web server with basic URL path routing (Port 3000)
└── urlDemo.js                 # HTTP web server parsing URL pathnames and query strings
```

---

## Environment Variables

For scripts that require sensitive credentials or dynamic configurations (such as database URIs), environment variables are used.

### Sub-project Environment Configuration (`NodeJsConnection/.env`)
Create a `.env` file in the `NodeJsConnection/` directory with the following variable:

```env
# NodeJsConnection/.env.example
MONGO_URL=mongodb://localhost:27017/myDatabase
# Or for MongoDB Atlas:
# MONGO_URL=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/myDatabase
```

> **Security Note**: Never commit actual `.env` files containing password credentials or database connection strings to public git repositories.

---

## How to Run the Project

You can run the default entry server script or execute any specific module directly using Node.js.

### Default Start Script
To run the primary HTTP server (`server.js`):
```bash
npm start
```
This runs `node server.js`, starting a server on port `5000`.

### Running Individual Scripts

#### 1. Basic Console Scripts
```bash
# Print starter greeting
node hello.js

# Calculate average grade and status
node grade.js

# Explore global variables (__dirname) and async timers
node global.js

# Terminal text styling with Chalk
node color.js
```

#### 2. Custom Modules & Logic
```bash
# Execute application using mathHelper module
node app.js
```

#### 3. Asynchronous File Handling Demonstrations
```bash
# Callback pattern demonstration
node callbackDemo.js

# Promises pattern demonstrations
node promisDemo.js
node promisDemo1.js

# Async/Await pattern demonstrations
node asyncAwaitDemo.js
node asyncAwaitDemo1.js
```

#### 4. Event Emitter Demonstration
```bash
# Trigger and listen to order events
node eventsDemo.js
```

#### 5. Web Servers
```bash
# Basic HTTP Server (Port 5000)
node server.js
# Access in browser: http://localhost:5000

# Native HTTP Server with path routing (Port 3000)
node server1.js
# Access in browser: http://localhost:3000 or http://localhost:3000/about

# Native HTTP Server with URL & Query Parameter parsing (Port 3000)
node urlDemo.js
# Access in browser: http://localhost:3000/search?item=shoes&size=7

# Express.js Web Server (Port 3000)
node app1.js
# Access in browser: http://localhost:3000/
# Access about route: http://localhost:3000/about
# Access route parameter: http://localhost:3000/greet/Alex
```

#### 6. Database Connection Script
```bash
cd NodeJsConnection
node Connection.js
cd ..
```

#### 7. Email Transmission Script
```bash
node sendEmail.js
```

---

## Usage Instructions & Script Reference

### Web Server Routes Summary (`app1.js` - Express)
When running `node app1.js`:
- `GET /` - Returns "Welcome to my Express Server".
- `GET /about` - Returns "This server uses the express.js Framework".
- `GET /greet/:name` - Returns personalized greeting, e.g. `http://localhost:3000/greet/Aisha` returns "Hello Aisha ! Nice to meet you."

### Custom Math Module Usage (`mathHelper.js` & `app.js`)
```javascript
const mathHelper = require("./mathHelper");

const price = 19.99;
const finalPrice = mathHelper.addTax(price, 0.08); // Adds 8% tax
console.log("Price with tax: $" + mathHelper.roundMoney(finalPrice));
```

### Event Handling Usage (`eventsDemo.js`)
```javascript
const EventEmitter = require("events");
const orderEvent = new EventEmitter();

orderEvent.on("orderPlaced", (item) => {
    console.log("New order received for " + item);
});

orderEvent.emit("orderPlaced", "Blue sneakers");
```

---

## Additional Information & Troubleshooting

### Testing Commands
Currently, no automated test suite is configured. Running `npm test` will return the default notification:
```bash
npm test
```
*Output*: `Error: no test specified`

### Troubleshooting Port Conflicts
If you encounter an `EADDRINUSE` error when starting a server on port `3000` or `5000`:
- **Windows**: Terminate active Node.js processes using CMD:
  ```cmd
  taskkill /F /IM node.exe
  ```
- **Linux/macOS**: Find and kill the process using port `3000` or `5000`:
  ```bash
  lsof -i :3000
  kill -9 <PID>
  ```

### Gmail Nodemailer Authentication
If using `sendEmail.js` with Gmail, Google requires an **App Password** rather than your regular account password due to 2-Factor Authentication enforcement. Ensure 2FA is enabled on your Google account and generate an App Password under Security settings.

---

## License

This project is open-source and licensed under the [ISC License](https://opensource.org/licenses/ISC).
