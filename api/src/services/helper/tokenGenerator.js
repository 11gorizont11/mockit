import jwt from 'jsonwebtoken';
import config from 'config';
import TokenModel from '../../models/RefreshToken';

export default async ctx => {
  const token = jwt.sign(ctx.viewUser, config.get('SECRET_JWT'));
  const { id: userId } = ctx.viewUser;

  const newRefreshToken = await TokenModel.create({
    token: jwt.sign(userId, config.get('SECRET_JWT')),
    userId
  });

  if (!newRefreshToken) {
    return ctx.internalServerError({
      message: 'Oops, something went wrong...'
    });
  }

  ctx.ok({
    token,
    refreshToken: newRefreshToken.token
  });
};
