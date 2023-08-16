const Pokemon = require('../entities/pokemon');

class PokemonService {
  populate(model) {
    return model.populate('attacks');
  }

  async getById(id) {
    const pokemon = await Pokemon.findOne({ _id: id });

    if (!pokemon) throw new Error('No pokemon [pokemonService.getById]');

    return this.populate(pokemon);
  }
  async getByPokedexId(id) {
    const pokemon = await Pokemon.findOne({ pokedexIndex: id });

    if (!pokemon) throw new Error('No pokemon [pokemonService.getByPokedexId]');

    return this.populate(pokemon);
  }

  async attachAttack(pokemonId, attackId) {
    const pokemon = await Pokemon.findOneAndUpdate({ _id: pokemonId }, { $push: { attacks: attackId } }, { new: true }).populate('attacks');

    if (!pokemon) throw new Error('No pokemon [pokemonService.attachAttack]');

    return this.populate(pokemon);
  }
}

const pokemonService = new PokemonService();

module.exports = { pokemonService };
