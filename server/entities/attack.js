const Mongoose = require('mongoose');
const { POKEMON_TYPES } = require('../constants/pokemonTypes');
const PokemonSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      enum: [{ ...POKEMON_TYPES }],
      required: true,
      default: POKEMON_TYPES.NORMAL
    },
    attempts: {
      type: Number,
      default: 20
    },
    damage: {
      type: Number,
      default: 40
    }
  },
  { collection: 'attacks' }
);

module.exports = Mongoose.model('Attack', PokemonSchema);
