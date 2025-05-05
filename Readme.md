# Full Stack User Directory Project

This project includes a Node.js backend and a React frontend with advanced features such as pagination, infinite scroll, search, and sorting.

---

## 🔧 Backend Documentation

# Backend - Express.js API

## Setup Instructions

1. Navigate to the backend folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

- **Base URL**: http://localhost:3001
- **API Endpoint**: `/api/users?page=1&limit=50&search=abc&sort=name`

## Project Structure

```
server/
├── data/            # User data or mock data
├── routes/          # Express route handlers
├── server.js        # Main entry file for Express server
```

## Features

- Server-side pagination
- Search by name/email
- Sorting by fields
- API returns paginated user data with `total` count

## Tech Stack

- Node.js
- Express.js
- CORS & Axios compatible

---

## 💻 Frontend Documentation

# Frontend - React + TanStack Table

## Setup Instructions

1. Navigate to the frontend folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

- Runs on: http://localhost:5173

## Features

- Virtual scrolling using `@tanstack/react-virtual`
- Search with debounce optimization
- Sorting columns dynamically
- Clean UI with vanilla CSS
- Error/loading state handling

## Project Structure

```
client/
├── components/          # UserTable, SearchBar
├── hooks/               # usePaginatedUsers, useDebouncedValue
├── App.jsx              # Main app logic
├── App.css              # Vanilla styling
└── main.jsx             # Vite entry point
```

## Optimization Techniques

- Only visible rows rendered via virtualization
- Debounced API calls reduce load
- Memoization using `React.memo` and `useMemo`
- Clean separation of concerns (UI, logic, API)
