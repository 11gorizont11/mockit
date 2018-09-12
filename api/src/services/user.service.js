import UserModel from '../models/User';

export const createUser = async (ctx, next) => {
  const { login, email, password } = ctx.request.body;
  console.log('Body', ctx.request.body);

  const user = await UserModel.insertMany({ login, email, password });
  ctx.viewUser = { login: user.login, id: user.id, email: user.email };
  ctx.status = 201;
  await next();
};
