import mongoose from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';
import config from 'config';

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: 'Login is Required',
      unique: 'Same Login already exist'
    },
    email: {
      type: String,
      required: 'E-mail is required',
      unique: 'This e-mail already exist'
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = hashSync(user.password, config.get('SALT_ROUND'));
  next();
});

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  if (!this.password) return false;

  return compareSync(password, this.password);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
