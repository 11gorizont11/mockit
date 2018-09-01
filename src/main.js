import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from 'config';

import { addNewRoute } from './services/addNewRoute';

const app = new Koa();
const router = new Router();
const port = config.get('APP_PORT');

app.use(bodyParser()).use(router.routes());

router.get('/', ctx => {
  ctx.body = 'Hello world!!!';
});

router.post('/endpoint', ctx => {
  const { body } = ctx.request;
  try {
    addNewRoute(router, body);
    ctx.body = 'Endpoint created!';
  } catch (error) {
    ctx.status = 405;
    ctx.body = error.message;
  }
});

export const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
