const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../Utilities/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.get('/register', users.newUserForm);

router.post('/register', catchAsync(users.registerNewUser));

router.get('/login', users.loginForm);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;
