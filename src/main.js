import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import config from 'config';

import { addNewRoute, isHasInRouter, removeRoute } from './services';

const app = new Koa();
const router = new Router();

if (process.env.NODE_ENV === 'development') {
  app.use(logger());
}

app
  .use(
    bodyParser({
      enableTypes: ['json'],
      jsonLimit: '5mb',
      strict: true,
      onerror: function(err, ctx) {
        ctx.throw('body parse error', 422);
      }
    })
  )
  .use(respond())
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/', ctx => {
  ctx.body = 'Hello world!!!';
});

router
  .post('/endpoint', ctx => {
    const {
      body: { method, statusCode, body, path }
    } = ctx.request;

    if (isHasInRouter({ router, method, path })) {
      ctx.send(
        405,
        `Route with Path ${path} and Method ${method} has existed already.`
      );
    } else {
      addNewRoute({ router, method, statusCode, body, path });
      ctx.created('Endpoint created!');
    }
  })
  .del('/endpoint', ctx => {
    const { path, method } = ctx.request.body;
    if (isHasInRouter({ router, method, path })) {
      removeRoute({ router, method, path });
      ctx.ok('Service has been successfully stopped');
    } else {
      ctx.notFound(`Route with Path ${path} and Method ${method} not found.`);
    }
  });

export const server = app.listen(config.get('APP_PORT'), () => {
  console.log(`Server listening on port: ${config.get('APP_PORT')}`);
});
