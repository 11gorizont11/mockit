import mongoose from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';
import config from 'config';

const userSchema = new mongoose.Schema(
  {
    login: String,
    email: {
      type: String,
      required: 'E-mail is required',
      unique: 'This e-mail already exist'
    },
    passwordHash: String
  },
  {
    timestamps: true
  }
);

userSchema.virtual('password').set(function(password) {
  this.passwordHash = hashSync(password, config.get('SALT_ROUND'));
});

userSchema.methods.checkPassword = password => {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return compareSync(password, this.passwordHash);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
