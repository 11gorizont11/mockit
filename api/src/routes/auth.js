import Router from 'koa-router';
import jwtMiddleware from 'koa-jwt';
import createUserHandler from '../services/user.service';
import loginHandler from '../services/auth.service';
import refreshTokenHandler from '../services/refresh.service';
import logoutHandler from '../services/logout.service';
import config from 'config';

const router = new Router();

router.post('/sign-up', createUserHandler);

router.post('/login', loginHandler);

router.post('/refresh', refreshTokenHandler);

router.post(
  '/logout',
  jwtMiddleware({ secret: config.get('SECRET_JWT') }),
  logoutHandler
);

export default router;
