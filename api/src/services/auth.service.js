import compose from 'koa-compose';
import UserModel from '../models/User';
import tokenGenerator from './helper/tokenGenerator';

const loginHandler = async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = await UserModel.findOne({ email });
  if (!user || !user.checkPassword(password)) {
    return ctx.forbidden({
      message: 'Invalid credentials username or password'
    });
  }
  ctx.viewUser = { login: user.login, id: user.id, email: user.email };
  await next();
};

export default compose([loginHandler, tokenGenerator]);
