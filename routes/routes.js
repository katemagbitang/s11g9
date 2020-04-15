const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');

const registerController = require('../controller/registerController.js');

const postController = require('../controller/postController.js');

const userController = require('../controller/userController.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/signup', registerController.getRegistration);

app.post('/signup', registerController.postRegistration);

app.get('/create_post', postController.createPost);

app.get('/editprofile', userController.editProfile);

module.exports = app;