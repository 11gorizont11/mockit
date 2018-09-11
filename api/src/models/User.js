import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    login: String,
    email: {
      type: String,
      required: 'E-mail is required',
      unique: 'This e-mail already exist'
    },
    passwordHash: String,
    salt: String
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
