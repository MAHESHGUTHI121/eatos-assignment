# Restaurant Admin Dashboard

A full-stack admin dashboard for restaurant management, built with React, Node.js, Express, and MongoDB.

## Features
- **Menu Management**: Create, Read, Update, Delete menu items.
- **Search**: Debounced search for menu items (300ms delay).
- **Filtering**: Filter items by category and availability.
- **Optimistic UI**: Instant availability toggling with rollback on failure.
- **Orders Dashboard**: Track and manage orders with status updates.
- **Analytics**: Top 5 selling items aggregation.

## Tech Stack
- **Frontend**: React (Vite), CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Prerequisites
- Node.js installed
- MongoDB installed and running locally (or MongoDB Atlas connection string)

## Installation

1. **Clone the repository** (or use the provided folder)

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file if not exists
   # PORT=5000
   # MONGODB_URI=mongodb://localhost:27017/restaurant-dashboard
   
   # Seed the database (Optional)
   node seed.js
   
   # Start the server
   npm start
   # or for dev
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables
### Backend (.env)
- `PORT`: Server port (default 5000)
- `MONGODB_URI`: MongoDB connection string

### Frontend
- No external env vars required for local dev (proxies to localhost:5000).

## API Endpoints

### Menu
- `GET /api/menu`: List all items (filters: category, isAvailable)
- `GET /api/menu/search?q=...`: Search items
- `GET /api/menu/:id`: Get item details
- `POST /api/menu`: Create item
- `PUT /api/menu/:id`: Update item
- `DELETE /api/menu/:id`: Delete item
- `PATCH /api/menu/:id/availability`: Toggle availability

### Orders
- `GET /api/orders`: List orders (pagination, status filter)
- `GET /api/orders/analytics/top-items`: Top 5 selling items
- `POST /api/orders`: Create order
- `PATCH /api/orders/:id/status`: Update status

## Challenges Implemented
1. **Search Debouncing**: Implemented custom `useDebounce` hook to delay API calls.
2. **MongoDB Aggregation**: `$unwind`, `$group`, `$sort`, `$limit`, `$lookup` pipeline for top selling items.
3. **Optimistic UI**: Immediate local state update for menu item availability toggling.

## Deployment
- **Frontend**: Ready for Netlify (Command: `npm run build`, Directory: `dist`)
- **Backend**: Ready for Render (Command: `npm install`, Start: `node server.js`)
# eatos-assignment 
