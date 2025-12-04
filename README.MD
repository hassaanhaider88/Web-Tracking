# DevTrace By HMK CodeWeb

A complete backend API for web tracking built with Node.js, Express, MongoDB, and Socket.io. This server provides real-time visitor tracking, analytics, and project management.

## Features

- User authentication with JWT
- Project management with API keys
- Real-time visitor tracking
- Geolocation tracking (country, region, city)
- Browser, OS, and device detection
- Rate limiting for security
- Socket.io for real-time updates
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote instance)
- npm or yarn

## Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```
MONGO_URI=mongodb://localhost:27017/web-tracking
JWT_SECRET=your-secure-secret-key-change-this
PORT=3000
NODE_ENV=development
```

## Running the Server

### Development mode (with auto-restart):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### POST `/api/auth/signup`

Create a new user account

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response:

```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "_id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/login`

Login with existing credentials

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Projects

#### GET `/api/mywebsites`

Get all projects owned by authenticated user (requires JWT token)

Headers:

```
Authorization: Bearer <your-jwt-token>
```

Response:

```json
{
  "success": true,
  "projects": [
    {
      "_id": "project-id",
      "name": "My Website",
      "siteUrl": "https://example.com",
      "apiKey": "api-key",
      "createdAt": "2025-11-26T00:00:00.000Z",
      "stats": {
        "totalVisits": 123
      }
    }
  ]
}
```

#### POST `/api/projects`

Create a new project (requires JWT token)

Headers:

```
Authorization: Bearer <your-jwt-token>
```

Body:

```json
{
  "name": "My Website",
  "siteUrl": "https://example.com"
}
```

#### GET `/api/projects/:id/visits`

Get visits for a specific project (requires JWT token)

Query parameters:

- `page` (default: 1)
- `pageSize` (default: 50)

#### GET `/api/projects/:id/stats`

Get aggregated statistics for a project (requires JWT token)

Returns browser stats, OS stats, top countries, and more.

### Tracking (Public Endpoint)

#### POST `/api/track`

Track a visit (no authentication required, uses API key)

Body:

```json
{
  "apiKey": "your-project-api-key",
  "path": "/pricing",
  "referrer": "https://google.com",
  "timestamp": "2025-11-26T12:34:56.000Z",
  "client": {
    "ua": "Mozilla/5.0..."
  }
}
```

Alternative: Use `x-api-key` header instead of body parameter

Rate limit: 100 requests per minute per IP

## Socket.io Real-Time Updates

The server provides real-time updates through Socket.io on the same port (3000).

### Connecting from Frontend

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  auth: {
    token: "your-jwt-token",
  },
});

socket.on("visit", (data) => {
  console.log("New visit:", data);
  // data structure:
  // {
  //   projectId: "...",
  //   visit: { ip, geo, browser, os, device, path, referrer, createdAt, ... }
  // }
});
```

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Rate limiting on tracking endpoint
- Helmet.js for security headers
- Trust proxy configuration
- Input validation

## Database Models

### User

- name: String
- email: String (unique)
- passwordHash: String
- createdAt: Date

### Project

- owner: ObjectId (ref: User)
- name: String
- siteUrl: String
- apiKey: String (unique)
- createdAt: Date

### Visit

- project: ObjectId (ref: Project)
- ip: String
- geo: { country, region, city, lat, lon }
- ua: String
- browser: String
- os: String
- device: String
- path: String
- referrer: String
- createdAt: Date

## Frontend Integration

Your frontend should connect to `http://localhost:3000` for all API requests. Example tracking script for websites:

```html
<script>
  (function () {
    const apiKey = "your-api-key";
    const trackingUrl = "http://localhost:3000/api/track";

    fetch(trackingUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: apiKey,
        path: window.location.pathname,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        client: {
          ua: navigator.userAgent,
        },
      }),
    });
  })();
</script>
```

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing (use a strong random string)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Error Handling

All endpoints return consistent JSON responses:

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Development Tips

- MongoDB must be running before starting the server
- Use MongoDB Compass or mongo shell to inspect the database
- Check server logs for debugging information
- Socket.io connections can be monitored in browser DevTools

## License

ISC
