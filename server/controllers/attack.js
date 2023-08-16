const Attack = require('../entities/attack');

class AttackController {
  async create(req, res) {
    if (!req.body) return res.status(404).send({ success: false, error: 'no body' });

    const { name, damage, type, attempts } = req.body;

    if (!name) return res.status(404).send({ success: false, error: 'No name privided' });

    try {
      const attack = await Attack.create({ name, damage, type, attempts });

      return res.status(201).send({ success: true, attack });
    } catch (error) {
      return res.status(500).send({ success: true, error });
    }
  }
}

const attackController = new AttackController();

module.exports = { attackController };
