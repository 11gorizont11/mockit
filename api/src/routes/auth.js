import Router from 'koa-router';
import createUserHandler from '../services/user.service';
import loginHandler from '../services/auth.service';

const router = new Router();

router.post('/sign-up', createUserHandler);

router.post('/login', loginHandler);

export default router;
