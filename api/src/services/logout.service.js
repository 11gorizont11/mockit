import compose from 'koa-compose';
import TokenModel from '../models/RefreshToken';

const logoutHandler = async ctx => {
  const { id: userId } = ctx.state.user;
  console.log('USER', ctx.state.user);
  await TokenModel.deleteOne({ userId });

  ctx.ok({
    status: 'success'
  });
};

export default logoutHandler;
