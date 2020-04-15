const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');

// const signupController = require('../controllers/signupController.js');

// const successController = require('../controllers/successController.js');

// const profileController = require('../controllers/profileController.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/signup', signupController.getSignUp);