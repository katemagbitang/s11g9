// const db = require('../model/db.js');

const User = require('../model/user-model.js');

const registerController = {

    getRegistration: function (req, res) {
        res.render('registration');
    },

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
}

module.exports = registerController;