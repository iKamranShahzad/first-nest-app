# First NestJS App

A simple starter backend project built with [NestJS](https://nestjs.com/) and TypeScript.

## Features

- REST API with multiple endpoints
- Modular structure with feature modules (e.g., `sayname`)
- DTO validation using `class-validator`
- Example controller, service, and DTO structure
- Middleware example for logging and authorization check
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
    authcheck.middleware.ts # Example middleware
  sayname/
    sayname.controller.ts   # Sayname feature controller
    sayname.service.ts      # Sayname feature service
    sayname.module.ts       # Sayname feature module
    ...
  sum-service/
    sum-service.service.ts  # Sum calculation service
    ...
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
  Requires `name` to be a string.

- `POST /register`  
  Accepts JSON `{ "username": "...", "email": "...", "password": "..." }` and registers a user.  
  Validates username (min 3 chars), email, and password (min 6 chars).

- `POST /sayname`  
  Accepts JSON `{ "name": "YourName" }` and returns a greeting from the sayname module.

## Middleware

- All routes are protected by `AuthCheckMiddleware`, which logs requests and checks for the `Authorization` header.

## Getting Started

### Install dependencies

```sh
npm install
```

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

## Validation

All incoming POST data is validated using DTOs and `class-validator`. Invalid requests will receive a 400 Bad Request response.

## License

MIT License
