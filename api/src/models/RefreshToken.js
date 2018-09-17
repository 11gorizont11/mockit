import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: 'Token is required'
    },
    userId: String
  },
  {
    timestamps: true
  }
);

const TokenModel = mongoose.model('Token', refreshTokenSchema);
export default TokenModel;
