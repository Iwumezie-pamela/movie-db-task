# Movie Db App

## Overview

The **Movie Db App** allows users to explore movies, add them to their favorites, and view/manage the list. This app follows a **Netflix-inspired** design and is built with **React**, **Next.js**, and **TypeScript**.

---

## Getting Started

### Prerequisites

Ensure you have the following software installed:
- **Node.js** (v14 or above)
- **npm** or **yarn** (for managing dependencies)

Features

    - Browse movies and explore their details.
    - Add/remove movies to/from your favorites list.
    - View and manage your favorite movies on a dedicated page.
    - Favorites are persisted using localStorage.

Design Decisions

    * UI/UX Design: The app's design is inspired by the Netflix layout to create a familiar and intuitive user experience. The movie cards feature large poster images with movie titles, release dates, and ratings, all arranged in a responsive grid.

    * Technology Stack:
        * React: The core library for building UI components.
        * Next.js: Used for server-side rendering, routing, and optimized builds.
        * TypeScript: Ensures type safety and reduces errors during development.
        * Tailwind CSS: A utility-first CSS framework for styling the app. It simplifies the process of designing responsive layouts and custom components.

    * State Management: The app uses React hooks (useState, useEffect) to manage state. The favorites list is stored in the localStorage, allowing the user's preferences to persist between sessions.

    * Movie Data: The movie details (titles, images, ratings, etc.) are fetched from the TMDb API. The app dynamically fetches and displays data for each movie when needed.

    * Persisting Favorites: The list of favorite movies is saved in the localStorage to persist the user's selections across page refreshes and browser sessions.

    * Responsiveness: The app’s layout adapts for mobile, tablet, and desktop devices. It features a grid layout that adjusts depending on the screen size. On smaller screens, the grid displays fewer columns, while larger screens show more items per row.

    * Error Handling: Basic error handling is implemented for API calls. If a movie's data fails to load, the app gracefully handles the error without crashing and provides fallback UI.
