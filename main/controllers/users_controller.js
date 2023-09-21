const User = require('../models/user');


// module.exports.profile = function (req, res) {
//     return res.render('user_profile', {
//         title: 'User Profile'
//     })
// }
// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .then((user)=>{
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    })
    .catch((err)=>{
        console.log('error');
    })

}





// render the sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}
module.exports.update = function(req, res) {
    if (req.user.id == req.params.id) {
        updateUser(req.params.id, req.body)
            .then(function(user) {
                req.flash('success', 'Updated!');
                return res.redirect('back');
            })
            .catch(function(err) {
                req.flash('error', 'Update failed: ' + err.message);
                return res.status(500).send('Update failed: ' + err.message);
            });
    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}


module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // User with the same email already exists
                return res.redirect('back');
            } else {
                // Create a new user using Promises
                User.create(req.body)
                    .then(newUser => {
                        return res.redirect('/users/sign-in');
                    })
                    .catch(err => {
                        console.log('Error in creating user while signing up:', err);
                        return res.redirect('back');
                    });
            }
        })
        .catch(err => {
            console.log('Error in finding user in signing up:', err);
            return res.redirect('back');
        });
};


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'logged in sucessfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log('Error during logout:', err);
        }
        req.flash('success', 'you have logged out');
        return res.redirect('/');
    });
}
