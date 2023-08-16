require('dotenv').config();

const express = require('express');
const router = express.Router();

const Pokemon = require('../entities/pokemon');
const User = require('../entities/user');
const auth = require('../middleware/auth');
const { pokemonController } = require('../controllers/pokemon');

router.get('', auth, pokemonController.getAll);

router.post('/create-to-pokedex', auth, pokemonController.createToPokedex);

router.post('/attach/attack', auth, pokemonController.attachAttack);

module.exports = router;
