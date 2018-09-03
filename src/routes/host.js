import Router from 'koa-router';
import config from 'config';
import uniqid from 'uniqid';

const url = config.get('APP_URL');
const port = config.get('APP_PORT');
const router = new Router();

export default router.get('/host', ctx => {
  ctx.body = `http://${uniqid()}.${url}:${port}`;
});
