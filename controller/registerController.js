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

        // First Validate The Request
 
        // Check if this user already exists
        let user = User.findOne({ email: req.body.email });
        // if (user) {
        //     return res.status(400).send('That user already exists!');
        // } else {
            // Insert the new user if they do not exist yet
            user = new User({
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                userType: 'Regular'
            });
            user.save();
            console.log(user);
            res.redirect('/');

        // }
    },

    /*
        executed when the client sends an HTTP GET request `/getCheckID`
        as defined in `../routes/routes.js`
    */
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = registerController;