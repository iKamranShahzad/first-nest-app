# First NestJS App

A simple starter backend project built with [NestJS](https://nestjs.com/) and TypeScript.

## Features

- REST API with basic endpoints
- DTO validation using `class-validator`
- Example controller, service, and DTO structure
- Ready for unit and e2e testing

## API Endpoints

- `GET /`  
  Returns a welcome message.

- `GET /askquestion`  
  Returns a sample question.

- `POST /answer`  
  Accepts JSON `{ "name": "YourName" }` and returns a greeting.  
  Requires `name` to be a string.

## Getting Started

### Install dependencies

```sh
npm install

# Development
npm run start

# Watch mode
npm run start:dev

# Production
npm run build
npm run start:prod

# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov

##Validation
All incoming POST data is validated using DTOs and class-validator. Invalid requests will receive a 400 Bad Request response.
```

## License

MIT License
