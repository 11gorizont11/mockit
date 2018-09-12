import Router from 'koa-router';
import { createUser } from '../services/user.service';

const router = new Router();

export default router.post('/user', (ctx, next) => {
  console.log('BODY', ctx.request.body);
  createUser(ctx, next);
});