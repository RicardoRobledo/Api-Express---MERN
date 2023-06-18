const express = require('express');
const router = express.Router();

const task_controller = require('../controllers/taskDAO');


router.post('/task', task_controller.create);
router.put('/task', task_controller.update);
router.get('/task', task_controller.find);


module.exports = router;