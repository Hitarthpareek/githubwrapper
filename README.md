# GitHub Explorer Made By Hitarth🤖

A React-based web application that allows you to search for GitHub users, view their profiles, explore their repositories, and bookmark your favorites. This project leverages the GitHub API to fetch user and repository data in real-time.

## Features

*   **User Search**: Dynamically search for GitHub users as you type.
*   **Paginated Results**: Browse through search results with a simple pagination control.
*   **Detailed Profile View**: Click on any user to see a detailed profile including their bio, location, follower count, and total repositories.
*   **Repository Explorer**: View a list of a user's repositories.
*   **Sort & Filter Repos**: Sort repositories by stars, forks, name, or last updated date. Filter repositories by programming language.
*   **Bookmarking**: Save your favorite repositories. Bookmarks are stored locally in your browser.
*   **Bookmarks Page**: A dedicated page to view and manage all your bookmarked repositories.
*   **Responsive Design**: A clean and functional UI that works on various screen sizes.

## Tech Stack

*   **Frontend**: React, Vite
*   **Routing**: React Router
*   **API Communication**: Axios
*   **Styling**: CSS, Styled Components
*   **Linting**: ESLint

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your system.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/hitarthpareek/githubwrapper.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd githubwrapper
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the source code using ESLint.
*   `npm run preview`: Serves the production build locally for preview.

## Project Structure

The main application code is located in the `src/` directory:

```
src/
├── App.jsx           # Main component with routing setup
├── main.jsx          # Application entry point
├── App.css           # Global styles
├── Pages/            # Page-level components
│   ├── Home.jsx
│   └── BookmarksPage.jsx
├── components/       # Reusable UI components
│   ├── Header.jsx
│   ├── Input.jsx
│   ├── Loader.jsx
│   ├── PaginationBottomBar.jsx
│   ├── Profile.jsx
│   └── UserCard.jsx
└── assets/           # Static assets like images
