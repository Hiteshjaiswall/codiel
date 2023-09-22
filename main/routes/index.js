const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
// router.use('/posts', require('./posts'));
router.use('/posts', require('./posts'));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

//make sure the routes knows that im using the api
router.use('/api', require('./api'));

router.use('/comments', require('./comments'));
module.exports = router;