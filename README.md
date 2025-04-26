
# 🔐 Auth & Event Logging Microservice

This is a scalable backend application for user authentication and event logging. Designed with a modular structure for maintainability and growth. Built with **Fastify**, **Kafka**, **TypeScript**, and **Zod** — it integrates **PostgreSQL**, **DynamoDB**, and **ClickHouse** to handle user management, events, and enable powerful analytics. Ideal for modern, event-driven systems that require observability, traceability, and flexibility.

---

## 🧱 Tech Stack

- **Backend**: Fastify, TypeScript
- **Event Streaming**: Kafka
- **Database**: PostgreSQL, ClickHouse, DynamoDB
- **Authentication**: JWT + Bcrypt
- **Kafka Client**: kafkajs
- **Validation**: Zod

---

## 🚀 Features

- ✅ User registration
- ✅ Login with JWT token generation
- ✅ Event-driven architecture with Kafka
- ✅ Event logs stored in:
  - PostgreSQL for relational data
  - ClickHouse for analytics
  - DynamoDB for fast key-based access
- ✅ TypeScript with Zod validation and password hashing
- ✅ Custom metadata logging: IP address, user agent, service, environment, etc.
- ✅ Environment-based configuration

---

## 📁 Project Structure

```
.
├── docker/                   # Docker config and inits
├── prisma/                   # Prisma models and migrations
├── src/
│   ├── config/               # Environment configs
│   ├── consumers/            # Kafka consumers
│   ├── controllers/          # Route handlers (e.g. auth)
│   ├── middlewares/          # Middlewares (e.g. auth)
│   ├── services/             # Business logic (users, logs, events, consumer)
│   ├── routes/               # Route definitions
│   ├── models/               # Structure definitions and schemas
│   ├── utils/                # Utilities (e.g. JWT, logger)
│   ├── types/                # All Zod schemas
│   └── index.ts              # Main Fastify server
├── .env                      # Environment variables
└── README.md
└── docker-compose.yaml
```

---

## 🧪 Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fastify-events-stream.git
cd fastify-events-stream
```

### 2. Environment configuration

Create a `.env` file with required variables, you can check the [example.env](example.env).

### 3. Launch services with Docker

```bash
docker compose up -d
```

### 4. Install dependencies & build the app

```bash
npm install
npm run build
```

### 5. Deploy the tables on the servers

```bash
npm run generate-db
npm run create-dDb-table
```

### 6. Run the app

```bash
npm run start
```

### 7. Run the consumer

```bash
npm run consumer-up
```

---

## 🧪 API Endpoints

### POST `api/v1/auth/register`

Registers a new user and emits a Kafka event.

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "StrongPass123!"
}
```

### POST `api/v1/auth/login`

Returns a JWT token on successful login.

```json
{
  "username": "john_doe",
  "password": "StrongPass123!"
}
```
### POST `api/v1/auth/events`

Create custom events (auth Bearer is require)

```json
{
    "serviceName": "user_test"
}
```

### GET

Returns information about events. All routes are protected by the auth middleware, so a valid Bearer token is required.

  - `api/v1/auth/me` - Get information about me
  - `api/v1/events/:eventId` - Get information about a event
  - `api/v1/events/recent?topEvents=5` - Get the top # of events
  - `api/v1/analytics/top-events` - Get the top 10 events information
  - `api/v1/analytics/user/:userId` - Get the events by userId

---

## 📊 Event Logging Example

Each action emits a Kafka event with rich metadata:

```ts
{
  id: 'uuid',
  event_type: 'analytics_user',
  user_id: "uuid",
  action_type: "events",
  metadata: {
    ip_address: "192.168.1.1",
    user_agent: "Mozilla/5.0",
    resource_type: "auth",
    timestamp: "2025-04-13T12:34:56Z",
    result: "success",
    service_name: "auth-service",
    environment: "dev",
    version: "1.0.0"
  }
}
```

---

## 🧠 Design Decisions

- **Event-driven logging** decouples user actions from analytics or audit systems.
- **Typed contracts** ensure strong consistency across producers and consumers.
- **Zod** provides centralized and type-safe input validation.
- **JWT-based auth** allows for stateless, scalable session handling.
- **Kafka consumers** are grouped by domain (`auth`, `analytics`, etc.) to ensure independence.

---

## 🧪 Testing

You can use Postman or any HTTP client to test endpoints. Kafka events can be observed via Kafka UI or logs. Logs are persisted in PostgreSQL and ClickHouse.

---

## 📌 TODO

- [ ] Add unit/integration tests
- [ ] Add refresh token logic
- [✅] Handle the already exist error in the consumer
- [ ] Add OpenAPI (Swagger) docs
- [✅] Make modular the consumer
- [✅] Create docker for run the API
- [✅] Create docker for run the consumer

---

## 📄 License

[MIT](LICENSE)

---

## Contributing
Feel free to open issues or submit pull requests to improve the project.