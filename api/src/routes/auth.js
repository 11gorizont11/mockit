import Router from 'koa-router';
import loginHandler from '../services/auth.service';

const router = new Router();

router.post('/login', loginHandler);

export default router;
