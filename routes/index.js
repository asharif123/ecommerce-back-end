//import this library to use for router modularization
const router = require('express').Router();

//call the routes defined in api folder and assign to apiRoutes
const apiRoutes = require('./api');

//put api prefix in front of all routes defined in apiRoutes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;