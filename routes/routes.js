const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');

const registerController = require('../controller/registerController.js');

const postController = require('../controller/postController.js');

const userController = require('../controller/userController.js');

const passport = require('../helpers/passport.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/', userController.getUser);

app.post('/', userController.login);

app.get('/signup', registerController.getRegistration);

app.post('/signup', registerController.postRegistration);

app.get('/logout', userController.logout);

app.get('/create_post', postController.getCreatePost);

app.get('/editprofile', userController.getEditProfile);

app.get('/adminpromotion', userController.editAdmin);

app.post('/create_post', postController.postCreatePost);

app.get('/viewall_post', postController.viewAllPost);

app.post('/editprofile', userController.postEditProfile);

app.get('/post/:id', postController.viewPost);

module.exports = app;