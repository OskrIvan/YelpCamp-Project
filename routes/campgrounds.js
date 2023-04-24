const express = require('express');
const router = express.Router();
const catchAsync = require('../Utilities/catchAsync');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../Utilities/middleware');


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync( campgrounds.newCampgroundSave));

router.get('/new', isLoggedIn, campgrounds.newCampground);

router.route('/:id')
    .get(catchAsync(campgrounds.openCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCampgroundForm));


module.exports = router;

