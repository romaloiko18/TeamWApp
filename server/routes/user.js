const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { userService } = require('../services/user');
const { userController } = require('../controllers/user');
require('dotenv').config();

const User = require('../entities/user');
const Pokemon = require('../entities/pokemon');

router.get('', auth, userController.getUser);

router.post('/attach/pokemon', auth, userController.attachPokemon);

module.exports = router;
