class BattleService {
  getDelay() {
    return Math.floor(Math.random() * (5 - 2 + 1) + 2) * 1000;
  }
}

const battleService = new BattleService();

module.exports = { battleService };
