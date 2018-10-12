import Router from 'koa-router';
import RouteModel from '../models/Route';

const router = new Router();

export default router.get('/routes', async ctx => {
  const { id: userId } = ctx.state.user;

  try {
    const dbRoutes = await RouteModel.find({
      userId
    });

    return ctx.ok({
      stubs: dbRoutes
    });

  } catch (err) {
    return ctx.internalServerError('Oops... something went wrong.');
  }
});
