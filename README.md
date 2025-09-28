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

**Curl Request:**

```json
curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "u1@kitra.abc",
    "password": "123123"
}'
```

#### POST /logout

Logout user (requires authentication).

**Headers:**

```
Authorization: Bearer {access_token}
```

**Curl Request:**

```json
curl --location 'http://localhost:3000/refresh' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMCwiZW1haWwiOiJ1MUBraXRyYS5hYmMiLCJuYW1lIjoiVTEiLCJpYXQiOjE3NTkwNTE0MzYsImV4cCI6MTc1OTA1MzIzNn0.GTDXlkb5mJh7qNPxwP8V_dwITm2CKeoDlHA6fcVWo4w' \
--data '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMCwiZW1haWwiOiJ1MUBraXRyYS5hYmMiLCJuYW1lIjoiVTEiLCJpYXQiOjE3NTkwNTE0MzYsImV4cCI6MTc1OTY1NjIzNn0.2yOIiRaJRrfYm3FZBvoMGsGzwZFZjmm7N93DhpJiJ9Q"
}'
```

#### POST /refresh

Refresh access token.

**Request Body:**

```json
{
  "refresh_token": "jwt_refresh_token"
}
```

**Curl Request:**

```json
curl --location --request POST 'http://localhost:3000/logout' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMCwiZW1haWwiOiJ1MUBraXRyYS5hYmMiLCJuYW1lIjoiVTEiLCJpYXQiOjE3NTkwNTA1MjIsImV4cCI6MTc1OTA1MjMyMn0._OeME1z_a6wQzTH-G2wTDfz5VRYrEn6dPrS0M5cKyvQ'
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

**Curl Request:**

```json
curl --location 'http://localhost:3000/treasures?latitude=14.552036595352455&longitude=121.01696118771324&distance=10&minValue=20&maxValue=30' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMCwiZW1haWwiOiJ1MUBraXRyYS5hYmMiLCJuYW1lIjoiVTEiLCJpYXQiOjE3NTkwNTE0MzYsImV4cCI6MTc1OTA1MzIzNn0.GTDXlkb5mJh7qNPxwP8V_dwITm2CKeoDlHA6fcVWo4w'
```
