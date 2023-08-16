const User = require('../entities/user');

class UserService {
  populate(model) {
    return model.populate({
      path: 'pokemons',
      populate: {
        path: 'attacks'
      }
    });
  }

  async getUserById(id) {
    const user = await User.findOne({ _id: id });

    if (!user) throw new Error('No user [userService.getUserById]');

    return this.populate(user);
  }

  async attachPokemon(userId, pokemonId) {
    const user = await User.findOneAndUpdate({ _id: userId }, { $push: { pokemons: pokemonId } }, { new: true });

    if (!user) throw new Error('No user [userService.attachPokemon]');

    return this.populate(user);
  }
}

const userService = new UserService();

module.exports = { userService };
