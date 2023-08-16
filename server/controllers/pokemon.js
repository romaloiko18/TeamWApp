const Pokemon = require('../entities/pokemon');
const { pokemonService } = require('../services/pokemon');

class PokemonController {
  async createToPokedex(req, res) {
    if (!req.body) return res.status(404).send({ success: false, error: 'No body provided' });

    const { name, pokedexIndex, image, stats, user } = req.body;

    if (!name || !pokedexIndex) return res.status(404).send({ success: false, error: 'No needed params' });

    try {
      const pokemon = await Pokemon.create({ name, pokedexIndex, image });

      return res.send({ success: true, pokemon });
    } catch (error) {
      return res.status(500).send({ success: false, error });
    }
  }

  async getAll(req, res) {
    try {
      const pokemons = await Pokemon.find();

      return res.send({ success: true, pokemons });
    } catch (error) {
      return res.status(500).send({ success: false, error });
    }
  }

  async attachAttack(req, res) {
    if (!req.body) return res.status(404).send({ success: false, error: 'No body provided' });

    const { attackId, pokemonId } = req.body;

    if (!attackId || !pokemonId) return res.status(404).send({ success: false, error: 'No needed params' });

    try {
      const pokemon = await pokemonService.attachAttack(pokemonId, attackId);

      return res.send({ success: true, pokemon });
    } catch (error) {
      return res.status(500).send({ success: false, error });
    }
  }
}

const pokemonController = new PokemonController();

module.exports = { pokemonController };
