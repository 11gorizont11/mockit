import compose from 'koa-compose';
import UserModel from '../models/User';
import tokenGenerator from './helper/tokenGenerator';

const createUser = async (ctx, next) => {
  const { login, email, password } = ctx.request.body;
  try {
    const user = await UserModel.create({ login, email, password });

    ctx.viewUser = { login: user.login, id: user.id, email: user.email };
  } catch (err) {
    ctx.badRequest({
      message: 'This user is already exist.'
    });
  }
  await next();
};

export default compose([createUser, tokenGenerator]);
