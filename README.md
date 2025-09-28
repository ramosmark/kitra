# Kitra Game API

A treasure hunting game API built with Node.js, Express, and Sequelize.

## Setup

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=kitra_game
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
```

### Database Setup

Run the following commands to set up the database:

```bash
# Create database
npx sequelize-cli db:create

# Run migrations
npx sequelize-cli db:migrate

# Seed database with initial data
npx sequelize-cli db:seed:all
```

### Installation

```bash
npm install
```

### Run the Application

```bash
# Development mode
npm run dev
```

The server will start on port 3000.

## API Endpoints

### Authentication

#### POST /login

Login user and get access token.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "access_token": "jwt_token",
  "refresh_token": "jwt_refresh_token"
}
```

#### POST /logout

Logout user (requires authentication).

**Headers:**

```
Authorization: Bearer {access_token}
```

#### POST /refresh

Refresh access token.

**Request Body:**

```json
{
  "refresh_token": "jwt_refresh_token"
}
```

### Treasures

#### GET /treasures

Find treasures within specified distance from given coordinates.

**Headers:**

```
Authorization: Bearer {access_token}
```

**Query Parameters:**

- `latitude` (required): User's latitude
- `longitude` (required): User's longitude
- `distance` (required): Search radius in kilometers
- `value` (optional): Monetary value filter

**Response:**

```json
{
  "treasures": [
    {
      "id": 100,
      "name": "T1",
      "latitude": 14.5437648051331,
      "longitude": 121.019911678311,
      "distance": 0.97,
      "amount": "15.00"
    }
  ],
  "count": 1
}
```
