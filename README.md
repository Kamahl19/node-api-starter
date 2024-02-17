# Node API Starter

## What’s Inside?

- [Express.js](https://expressjs.com/) - fast, unopinionated, minimalist web framework for Node.js
  - [Cors](https://github.com/expressjs/cors) - CORS middleware
  - [Compression](https://github.com/expressjs/compression) - compression middleware
  - [Helmet](https://github.com/helmetjs/helmet) - secures Express app with various HTTP headers
  - [express-async-errors](https://github.com/davidbanham/express-async-errors) - async/await support for ExpressJS
  - [express-healthcheck](https://github.com/lennym/express-healthcheck) - healthcheck middleware for express
- [JWT](https://github.com/auth0/node-jsonwebtoken) Authorization - including all the common features such as Sign-up, Login, Logout, Forgotten password, Email verification
  - [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - bcrypt in plain JS with zero dependencies
- [Mongoose](https://mongoosejs.com/) - MongoDB ORM
  - `DB Seeding`
  - `DB Migrations`
- [Nodemailer](https://github.com/nodemailer/nodemailer/) - email service
  - [Mailgun Transport](https://github.com/orliesaurus/nodemailer-mailgun-transport) - send email using Mailgun.com
- [Joi](https://github.com/hapijs/joi) - object schema data validation library
  - [Celebrate](https://github.com/arb/celebrate) - joi validation middleware for Express
- [Pino](https://getpino.io/) - full-featured logging service
  - [express-pino-logger](https://github.com/pinojs/express-pino-logger) - express middleware to log with pino
  - [pino-pretty](https://github.com/pinojs/pino-pretty) - prettifier for Pino log lines for development purposes
- [es6-error](https://github.com/bjyoungblood/es6-error) - easily-extendable error for use with ES6 classes
- [http-status](https://github.com/adaltas/node-http-status) - utility to interact with HTTP status code in Node.js
- [ESLint](https://eslint.org/) - pluggable linting utility
  - [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) - rules for Node.js
- [Prettier](https://prettier.io/) - opinionated code formatter
- [Husky](https://github.com/typicode/husky) & [lint-staged](https://github.com/okonet/lint-staged) - run ESLint & Prettier before commiting new code
- [Dotenv](https://github.com/motdotla/dotenv) - loads environment variables from an `.env` file
- [Nodemon](https://github.com/remy/nodemon) - monitors for any changes and automatically restarts the server

## Getting Started

This project uses [dotenv](https://www.npmjs.com/package/dotenv) for setting environmental variables during development. Simply copy the `.env.example` file, rename it to `.env` and add your env variables as you see fit.
There is also a `src/config.js` file with several configuration options.

### Install, Seed DB & Start the server

```
npm install
npm run seed
npm start
```

The server will start at `http://localhost:3001`

## Deployment to Heroku

```
heroku login
heroku create my-app
git init
heroku git:remote -a my-app
git add .
git commit -am "initial commit"
git push heroku master
```

## Project structure

```
-| src/
 |--| app/: Main application (framework) files.
 |--| common/: Reusable common files such as messages, validation rules, services, utils etc.
 |--| features/: Features bundled into separate modules
 |--| seeds/: DB seed files
 |--| config.js: Global application config file
 |--| index.js: Application entry file
```

## Prettier

This project uses [Prettier](https://prettier.io/), an opinionated code formatter. In order to format code manually, run `npm run format` in app root directory. All the code is also formatted automatically on `pre-commit` hook. There is also `npm run format-check` for CI purposes to check if code is formatted properly.

## ESLint

Project comes with ESLint configured. It helps you prevent common errors.

There are multiple ways how to run ESLint.

- CLI: `npm run lint`
- it runs automatically on `pre-commit` hook
- in IDE if supported (Visual Studio Code supports reports)

## Updating dependencies

Project comes with the default [Renovate](https://renovatebot.com) config `renovate.json`. It takes care of automated dependency updates and it's free for open-source projects. More about how to [configure here](https://renovatebot.com/docs).
