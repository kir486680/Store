var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);
/* GET users listing. */

router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn , function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/signup', function (req, res, next) {
    var message = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken() });
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    feilureFlash: true
}));

router.get('/signin', function (req, res, next) {
    var message = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken() });
});
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
}));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}
function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}
