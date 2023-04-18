const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../Utilities/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../Utilities/middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async(req, res) => {
    try {
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next(err);
        req.flash('success', 'Welcome to YelpCamp!');
        res.redirect('/campgrounds');
    })
    } catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
res.render('users/login');
})

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (req, res) => {
        req.flash('success', 'Welcome Back!');
        const redirectUrl = res.locals.returnTo || '/campgrounds';
        res.redirect(redirectUrl);
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success', "You have loged out. Goodbye!");
    res.redirect('/campgrounds');
  });
}); 

module.exports = router;
