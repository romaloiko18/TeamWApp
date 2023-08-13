class UserProfileDto {
  constructor({ email, _id, pokemons, nickName, role }) {
    this.email = email;
    this._id = _id;
    this.pokemons = pokemons;
    this.nickName = nickName;
    this.role = role;
  }
}

module.exports = UserProfileDto;
