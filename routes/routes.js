const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');

const registerController = require('../controller/registerController.js');

const createPostController = require('../controllers/createPostController.js');

// const profileController = require('../controllers/profileController.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/signup', registerController.getRegistration);

app.post('/signup', registerController.postRegistration);

app.get('/create_post', createPostController.getCreatePost);

module.exports = app;