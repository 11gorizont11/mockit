import Router from 'koa-router';
import uniqid from 'uniqid';

const router = new Router();

export default router.get('/host', ctx => {
  ctx.ok({ host: uniqid() });
});
