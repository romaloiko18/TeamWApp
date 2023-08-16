const Pokemon = require('../entities/pokemon');

class Battle {
  getAttackedPokemon() {
    return Pokemon.findOne({ pokedexIndex: 1 });
  }

  handleEmitBattle(socket) {
    socket.on('battle-allowed', async (data) => {
      const pokemon = await this.getAttackedPokemon();

      setTimeout(() => {
        socket.emit('start-battle', { data: pokemon });
      }, 3000);
    });
  }
}
