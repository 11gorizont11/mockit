import jwt from 'jsonwebtoken';
import config from 'config';
// import TokenModel from '../../models/RefreshToken';

export default async ctx => {
  const token = jwt.sign(ctx.viewUser, config.get(SECRET_JWT));
  const refreshToken = jwt.sign(ctx.viewUser.id, config.get(SECRET_JWT));
  //FIXME: move to service
  // const refToken = await TokenModel.insertMany({ token: refreshToken });
  //TODO: validate res from db;
  console.log({
    token,
    refreshToken
  });
  ctx.ok({
    token,
    refreshToken
  });
};
