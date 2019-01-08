# Node API Starter

Simple starter for Node Rest API server using ExpressJS

## What’s Inside?

- `JWT Authorization` - including all the common features such as Sign-up, Login, Logout, Reset password, Email verification
- `mongoose` - MongoDB ORM
- `DB Seeding`
- `DB Migrations`
- `nodemailer` - email service
- `validation service` - object schema validation using `joi`
- `logger service` - full-featured logging service
- `Cors, Compression, Helmet`
- `eslint` - linting utility
- `prettier` - opinionated code formatter
- `dotenv` - loads environment variables from an `.env` file

## Getting Started

This project uses [dotenv](https://www.npmjs.com/package/dotenv) for setting environmental variables during development. Simply copy the `.env.example` file, rename it to `.env` and add your env variables as you see fit. Don't forget to set `MONGO_URL` properly.

### Install, Seed DB & Start the server

```
yarn install
yarn seed
yarn start
```

The server will start at `http://localhost:3001`

## Project structure

```
-| src/
 |--| app/: Main application (framework) files.
 |--| common/: Reusable common files such as messages, validation rules, services, utils etc.
 |--| features/: Features bundled into separate modules
 |--| seeds/: DB seed files
 |--| index.js: Application entry file
```

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

## Prettier

This project uses [Prettier](https://prettier.io/), an opinionated code formatter. It also comes with Prettier configuration for [Visual Studio Code](https://code.visualstudio.com/). In order to format code manually, run `yarn format` in app root directory.

## ESLint

Project comes with ESLint configured. It helps you prevent common errors.

There are multiple ways how to run ESLint.

- CLI: `yarn lint`
- in IDE if supported (Visual Studio Code supports reports)
