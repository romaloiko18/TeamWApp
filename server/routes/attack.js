const express = require('express');
const router = express.Router();
const { attackController } = require('../controllers/attack');
const auth = require('../middleware/attack');

require('dotenv').config();

router.post('/create', auth, attackController.create);

module.exports = router;
