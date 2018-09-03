import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import config from 'config';

import {
  addNewRoute,
  isHasInRouter,
  removeRoute,
  validateFields
} from './services';

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
        ctx.throw(422, 'body parse error');
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
    const schema = {
      statusCode: { type: 'Number', require: true },
      path: { type: 'String', require: true },
      method: { type: 'String', require: true },
      body: { type: 'Object' }
    };
    const errors = validateFields(ctx.request.body, schema);

    if (errors.length) {
      return ctx.send(400, errors.join('\n'));
    }

    if (isHasInRouter({ router, method, path })) {
      return ctx.send(
        405,
        `Route with Path ${path} and Method ${method} has existed already.`
      );
    }
    try {
      addNewRoute({ router, method, statusCode, body, path });
      ctx.created('Endpoint created!');
    } catch (err) {
      ctx.send(400, err.message);
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
