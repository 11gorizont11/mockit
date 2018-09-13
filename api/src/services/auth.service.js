import compose from 'koa-compose';
import UserModel from '../models/User';
import tokenGenerator from './helper/tokenGenerator';

const loginHandler = async (ctx, next) => {
  const { login, password } = ctx.request.body;
  console.log('USER creds', { login, password });
  const user = await UserModel.find({ login });
  console.log('USER', user);
  if (!user || !user.checkPassword(password)) {
    ctx.unauthorized({
      message: 'Invalid credentials username or password'
    });
  }
  ctx.viewUser = { login: user.login, id: user.id, email: user.email };
  next();
};

export default compose([loginHandler, tokenGenerator]);
