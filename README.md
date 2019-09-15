# [API documentation](https://app.swaggerhub.com/apis/MHekert/Amethyst/0.1.0)

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
-   create node.env file ([go to example](#nodeenv))
-   change branch to development:
    `git checkout development`
-   install dependencies
    `yarn install`
-   start MongoDB - linux: `sudo mongod` - windows: [follow installation guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
-   run application
    `yarn start`

## node.env

### example

```
NODE_ENV=development
SESSION_SECRET=keybordCat
MONGODB_URI_TEST=mongodb://localhost:27017/testDB
MONGODB_URI=mongodb://localhost:27017/localDB
PORT=8080
FRONTEND_URL=http://localhost:3000
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_secret
FACEBOOK_CALLBACK_URL=http://localhost:8080/auth/facebook/callback
FIREBASE_IMGS_URL=https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT_ID.appspot.com/o/DIRECTORY%2F
FIREBASE_SAK_TYPE=...
FIREBASE_SAK_PROJECT_ID=...
FIREBASE_SAK_PRIVATE_KEY_ID=...
FIREBASE_SAK_PRIVATE_KEY="..."
FIREBASE_SAK_CLIENT_EMAIL=...
FIREBASE_SAK_CLIENT_ID=...
FIREBASE_SAK_AUTH_URI=...
FIREBASE_SAK_TOKEN_URI=...
FIREBASE_SAK_AUTH_PROVIDER_X509_CERT_URL=...
FIREBASE_SAK_CLIENT_X509_CERT_URL=...
```

### node.env pitfalls

-   `NODE_ENV` - optional, default value: `development`. [Read more](http://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)
-   `FIREBASE_IMGS_URL=https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT_ID.appspot.com/o/DIRECTORY%2F`
    -   Replace `YOUR_PROJECT_ID` with your project id (can be find in serviceAccountKey.json)
    -   Replace `DIRECTORY%2F` with your path to directory in which files should be saved. Path needs to be url encoded (eg. `%2F` insteed of `/`)
-   value of every key that starts with `FIREBASE_SAK_` can be found in serviceAccountKey.json - accessible from [firebase console](https://console.firebase.google.com)
-   value of every key that starts with `FACEBOOK_` can be found on app's page at [developer.facebook.com](https://developers.facebook.com)
-   `FIREBASE_SAK_PRIVATE_KEY`'s value needs to be double quoted

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
