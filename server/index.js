'use strict'
const router = require('express').Router()
const studRouter = require('./routes/students.js');
const campRouter = require('./routes/campuses.js');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!
router.use('/students', studRouter);
router.use('/campuses', campRouter);

module.exports = router;