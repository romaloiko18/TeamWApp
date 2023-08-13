const Mongoose = require('mongoose');
const { USER_ROLES } = require('../constants/userRoles');

const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: [{ ...USER_ROLES }],
    default: USER_ROLES.USER
  },
  nickName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pokemons: [
    {
      type: Mongoose.Types.ObjectId,
      ref: 'Pokemon'
    }
  ]
});

module.exports = Mongoose.model('User', UserSchema);
