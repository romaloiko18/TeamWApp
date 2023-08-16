const { userService } = require('../services/user');
const { pokemonService } = require('../services/pokemon');
const UserProfileDto = require('../dto/user');
const Pokemon = require('../entities/pokemon');
const User = require('../entities/user');

class UserController {
  async getUser(req, res) {
    const userId = req.body.userId;

    try {
      const user = await userService.getUserById(userId);

      return res.send({ success: true, user: new UserProfileDto(user) });
    } catch (error) {
      return res.send({ success: false, error });
    }
  }

  async attachPokemon(req, res) {
    if (!req.body.pokedexId) return res.send({ success: false, error: 'pass needed params' });

    try {
      const pokemon = await pokemonService.getByPokedexId(req.body.pokedexId);

      const user = userService.attachPokemon(req.body.userId, pokemon._id);

      return res.send({ success: true, user: user });
    } catch (error) {
      return res.status(500).send({ success: false, error });
    }
  }
}

const userController = new UserController();

module.exports = { userController };
