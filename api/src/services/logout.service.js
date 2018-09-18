import TokenModel from '../models/RefreshToken';

const logoutHandler = async ctx => {
  const { id: userId } = ctx.state.user;

  const token = await TokenModel.deleteOne({ userId });
  ctx.ok({
    message: 'Logout successfully.'
  });
};

export default logoutHandler;
