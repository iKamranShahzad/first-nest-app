# First NestJS App

A backend project built with [NestJS](https://nestjs.com/) and TypeScript, featuring authentication, email verification, password reset, Redis and ArangoDB integration, modular structure, and API documentation.

## Prerequisites

- Node.js v16+
- npm v8+
- [ArangoDB](https://www.arangodb.com/) (for user storage)
- [Redis](https://redis.io/) (for caching)
- [Mailtrap](https://mailtrap.io/) or SMTP credentials (for email)

## Features

- REST API with multiple endpoints
- Modular structure with feature modules (e.g., `sayname`, `sum-service`, `auth`)
- DTO validation using `class-validator`
- JWT authentication with email verification and password reset
- Middleware for logging and authorization header check
- Redis caching support
- ArangoDB for user data
- Swagger API documentation (`/api-docs`)
- Ready for unit and e2e testing

## Project Structure

```
src/
  app.controller.ts         # Main API controller
  app.service.ts            # Main service logic
  app.module.ts             # Root module
  main.ts                   # Entry point
  dto/
    app.dto.ts              # DTOs for main endpoints
    sayName.dto.ts          # DTO for sayname feature
  middleware/
    authcheck.middleware.ts # Middleware for logging/auth check
  sayname/
    sayname.controller.ts   # Sayname feature controller
    sayname.service.ts      # Sayname feature service
    sayname.module.ts       # Sayname feature module
  sum-service/
    sum-service.service.ts  # Sum calculation service
  auth/
    auth.controller.ts      # Auth endpoints (register, login, etc.)
    auth.service.ts         # Auth logic
    jwt.strategy.ts         # JWT strategy for Passport
    verified-user.guard.ts  # Guard for verified users
    dto/
      auth.dto.ts           # DTOs for auth endpoints
  database/
    arangodb.provider.ts    # ArangoDB connection and collections
    redis.provider.ts       # Redis connection
  utils/
    email.ts                # Email sending utilities
test/
  app.e2e-spec.ts           # End-to-end tests
  jest-e2e.json             # Jest e2e config
```

## API Endpoints

- `GET /`  
  Returns a welcome message.

- `GET /askquestion`  
  Returns a sample question.

- `GET /query?name=John&age=25`  
  Returns a message with the provided name and age.

- `GET /sum?a=1&b=2`  
  Returns the sum of `a` and `b`.

- `GET /:id`  
  Returns a message with the provided user id.

- `POST /answer`  
  Accepts JSON `{ "name": "YourName" }` and returns a greeting.

- `POST /redis-set?key=foo&value=bar`  
  Sets a Redis key-value pair.

- `GET /redis-get?key=foo`  
  Gets a Redis value by key.

### Auth Endpoints

- `POST /auth/register`  
  Register a new user. `{ "email": "...", "password": "..." }`

- `POST /auth/login`  
  Login and receive a JWT cookie. `{ "email": "...", "password": "..." }`

- `POST /auth/logout`  
  Logout and clear the JWT cookie.

- `GET /auth/verify?token=...`  
  Verify account using email token.

- `POST /auth/resend-verification`  
  Resend verification email. `{ "email": "..." }`

- `POST /auth/reset-password-request`  
  Request password reset email. `{ "email": "..." }`

- `POST /auth/reset`  
  Reset password using token. `{ "password": "...", "token": "..." }`

### Protected Endpoints

- `POST /sayname`  
  Requires JWT and verified account. Accepts `{ "name": "YourName" }` and returns a greeting.

## Middleware

- `/sayname` routes are protected by `AuthCheckMiddleware`, which logs requests and checks for the `Authorization` header.

## Getting Started

### Install dependencies

```sh
npm install
```

### Set up environment variables

Create a `.env` file with your ArangoDB, Redis, JWT, and SMTP credentials.

### Run the app

```sh
# Development
npm run start

# Watch mode
npm run start:dev

# Production
npm run build
npm run start:prod
```

### Run tests

```sh
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation

Swagger UI is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Validation

All incoming POST data is validated using DTOs and `class-validator`. Invalid requests will receive a 400 Bad Request response.

## License

MIT License