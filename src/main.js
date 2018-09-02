import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from 'config';

import { addNewRoute, isHasInRouter, removeRoute } from './services';

const app = new Koa();
const router = new Router();
const port = config.get('APP_PORT');

app.use(bodyParser()).use(router.routes());

router.get('/', ctx => {
  ctx.body = 'Hello world!!!';
});

router
  .post('/endpoint', ctx => {
    const {
      body: { method, statusCode, body, path }
    } = ctx.request;

    if (isHasInRouter({ router, method, path })) {
      ctx.status = 405;
      ctx.body = `Route with Path ${path} and Method ${method} has existed already.`;
    } else {
      addNewRoute({ router, method, statusCode, body, path });
      ctx.body = 'Endpoint created!';
    }
  })
  .del('/endpoint', ctx => {
    const { path, method } = ctx.request.body;
    if (isHasInRouter({ router, method, path })) {
      removeRoute({ router, method, path });
      ctx.body = 'Service has been successfully stopped';
    } else {
      ctx.status = 404;
      ctx.body = `Route with Path ${path} and Method ${method} not found.`;
    }
  });

export const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
