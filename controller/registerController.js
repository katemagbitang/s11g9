const db = require('../model/db.js');

const User = require('../model/user-model.js');

const registerController = {

    /*
        executed when the client sends an HTTP GET request `/signup`
        as defined in `../routes/routes.js`
    */
    getRegistration: function (req, res) {
        res.render('registration');
    },

    /*
        executed when the client sends an HTTP POST request `/signup`
        as defined in `../routes/routes.js`
    */
    postRegistration: function (req, res) {

        var firstName = req.body.firstname;
        var lastName = req.body.lastname;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var userType = 'Regular';
        
        var user = {
            firstName : firstname,
            lastName : lastname,
            email : email,
            username : username,
            password = password,
            userType = userType
        }
        
        db.insertOne(User, user, function(flag) {
            if(flag) {
                res.redirect('/');
            }
        });
    },

    /*
        executed when the client sends an HTTP GET request `/getCheckID`
        as defined in `../routes/routes.js`
    */
    getCheckID: function (req, res) {

        /*
            when passing values using HTTP GET method
            the values are stored in `req.query` object
            Example url: `http://localhost/getCheckID?idNum=11312345`
            To retrieve the value of parameter `idNum`: `req.query.idNum`
        */
        var idNum = req.query.idNum;

        /*
            calls the function findOne()
            defined in the `database` object in `../models/db.js`
            searches for a single document based on the model `User`
            sends an empty string to the user if there are no match
            otherwise, sends an object containing the `idNum`
        */
        db.findOne(User, {idNum: idNum}, 'idNum', function (result) {
            res.send(result);
        });
    }

}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;