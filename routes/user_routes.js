const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userDAO');


router.post('/user', user_controller.create);
router.get('/user', user_controller.find);
router.get('/user/logout', user_controller.logout);


module.exports = router;