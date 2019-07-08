# development environment setup guide

## Prerequisites

-   [installed node.js](https://nodejs.org/en/download/)
-   [installed MongoDB](https://docs.mongodb.com/manual/installation/)
-   [installed yarn](https://yarnpkg.com/lang/en/docs/install/)
-   [installed git](https://git-scm.com/download)

## How to run

-   clone or download repository
    `git clone https://github.com/MHekert/Project-Amethyst`
-   change directory to cloned/downloaded one
    `cd /path/to/project/directory`
-   create node.env file ([go to example](#nodeenv-example))
-   change branch to development:
    `git checkout development`
-   install dependencies
    `yarn install`
-   start MongoDB - linux: `sudo mongod` - windows: [follow installation guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
-   run application
    `yarn start`

## node.env example

```
ISDEV=true
SESSION_SECRET=keybordCat
MONGODB_URI_TEST=mongodb://localhost:27017/testDB
MONGODB_URI=mongodb://localhost:27017/localDB
PORT=8080
FRONTEND_URL=http://localhost:3000
FACEBOOK_APP_ID=ask_for_id
FACEBOOK_APP_SECRET=ask_for_secret
FACEBOOK_CALLBACK_URL=http://localhost:8080/auth/facebook/callback
```

## useful scripts

-   transpile typescript to javascript
    `yarn build`
-   transpile typescript and start application
    `yarn start`
-   transpile typescript and run tests
    `yarn test`
-   run tests without typescript transpilation
    `yarn justTest`
-   run application without typescript transpilation
    `yarn justStart`
-   transpile, run tests and run application after changes to any .ts, .json or .env file
    `yarn watch`
-   insert pseudo random mock data to database
    `yarn populateDatabase`
