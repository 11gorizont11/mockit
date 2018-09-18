import compose from 'koa-compose';
import UserModel from '../models/User';
import TokenModel from '../models/RefreshToken';
import tokenGenerator from './helper/tokenGenerator';

const refreshHandler = async (ctx, next) => {
  const { refreshToken } = ctx.request.body;

  const dbToken = await TokenModel.findOne({ token: refreshToken });
  if (!dbToken) {
    return ctx.notFound({
      message: 'Invalid refresh token.'
    });
  }

  const user = await UserModel.findById(dbToken.userId);

  if (!user) {
    return ctx.notFound({
      message: 'User not found'
    });
  }

  await TokenModel.deleteOne({ token: refreshToken });

  ctx.viewUser = { login: user.login, id: user.id, email: user.email };
  await next();
};

export default compose([refreshHandler, tokenGenerator]);
