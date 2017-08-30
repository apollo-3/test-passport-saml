/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    samlcallback: function(req, res) {
      passport.authenticate('saml', { failureRedirect: '/', failureFlash: true });
      // res.redirect('/');
    },
    samllogin: function(req, res) {
      passport.authenticate('saml', {
        successRedirect: '/',
        failureRedirect: '/samllogin'
      })(req,res);
    },
    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};

