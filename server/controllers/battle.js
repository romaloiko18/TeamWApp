const Pokemon = require('../entities/pokemon');
const { battleService } = require('../services/battle');

class BattleController {
  async start(req, res) {
    try {
      const pokemon = await Pokemon.findOne({ pokedexIndex: 1 });

      if (!pokemon) return res.status(404).send({ success: true, error: 'something went wrong' });

      const delay = battleService.getDelay();

      return res.status(201).send({ success: true, data: { pokemon, delay } });
    } catch (error) {
      return res.status(500).send({ success: true, error });
    }
  }
}
