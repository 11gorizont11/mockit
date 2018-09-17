import UserModel from '../models/User';

export const createUser = async (ctx, next) => {
  const { login, email, password } = ctx.request.body;
  try {
    const user = await UserModel.create({ login, email, password });

    ctx.viewUser = { login: user.login, id: user.id, email: user.email };
    ctx.created();
  } catch (err) {
    ctx.badRequest({
      message: 'This user is already exist.'
    });
  }

  next();
};
