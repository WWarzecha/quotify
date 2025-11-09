# Quotify

Quotify is a simple, single-page web application for viewing and managing a collection of quotes. It provides a clean interface to display a random quote or to perform full CRUD (Create, Read, Update, Delete) operations on your personal quote collection.

The application is built with a Vanilla JavaScript frontend and a lightweight Node.js backend project without relying on frameworks.

## Features

-   **Random Quote Display**: View a random quote upon loading the application.
-   **Get Another Quote**: Fetch a new random quote with the click of a button.
-   **Manage Quotes**: A dedicated view to manage your entire quote collection.
-   **Add New Quotes**: Easily add new quotes to your collection.
-   **Update Existing Quotes**: Edit and update the text of any quote.
-   **Delete Quotes**: Remove quotes you no longer want.

## Tech Stack

-   **Frontend**:
    -   HTML5
    -   CSS3
    -   Vanilla JavaScript (ES6 Modules)
-   **Backend**:
    -   Node.js
    -   Node.js `http` module (for the server)
    -   `cors` for handling cross-origin requests
-   **Database**:
    -   A simple `database.json` file for data persistence.
-   **Build & Development Tools**:
    -   Webpack for bundling assets.
    -   Babel for JavaScript transpilation.
    -   webpack-dev-server for a live-reloading development environment.
    -   ESLint for code linting.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and npm installed on your machine.

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/your-username/quotify.git
    ```
2.  Navigate into the project directory:
    ```sh
    cd quotify
    ```
3.  Install the necessary NPM packages:
    ```sh
    npm install
    ```

### Running the Application

To run the application, you need to start both the back-end and front-end servers in separate terminal windows.

1.  **Start the Back-End Server:**
    This server handles the API for managing quotes and runs on `http://localhost:3000`.
    ```sh
    npm start
    ```

2.  **Start the Front-End Development Server:**
    This will serve the front-end application and automatically open it in your default browser.
    ```sh
    npm run dev
    ```

The application should now be running and accessible.

## Available Scripts

-   `npm start`: Starts the Node.js back-end server.
-   `npm run dev`: Starts the Webpack development server with live reloading for the front end.
-   `npm run build`: Bundles the front-end application for production. The output is placed in the `dist` directory.
