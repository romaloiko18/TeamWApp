const Mongoose = require('mongoose');

const PokemonSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    pokedexIndex: {
      type: Number,
      required: true,
      unique: true
    },
    lvl: {
      type: Number,
      validate: {
        validator: (value) => {
          return value > 0 && value <= 100;
        },
        message: (props) => `${props.value} is not valid lvl number`
      }
    },
    evolutions: [
      {
        lvlToEvolute: {
          type: Number,
          default: 16
        },
        type: Mongoose.Types.ObjectId,
        ref: 'Pokemon'
      }
    ],
    stats: {
      health: {
        type: Number,
        default: 50
      },
      attack: {
        type: Number,
        default: 50
      },
      spAttack: {
        type: Number,
        default: 50
      },
      defence: {
        type: Number,
        default: 50
      },
      spDefence: {
        type: Number,
        default: 50
      },
      speed: {
        type: Number,
        default: 50
      }
    },
    attacks: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'Attack'
      }
    ],
    image: {
      type: String
    }
  },
  { collection: 'pokemons' }
);

module.exports = Mongoose.model('Pokemon', PokemonSchema);
