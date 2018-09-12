import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import Subdomain from 'koa-subdomain';
import mongoose from 'mongoose';
import config from 'config';
import host from './routes/host';
import user from './routes/user';

import {
  addNewRoute,
  isHasInRouter,
  removeRoute,
  validateFields
} from './services';

mongoose.Promise = Promise; // Ask Mongoose to use standard Promises
mongoose.set('debug', true); // Ask Mongoose to log DB request to console

mongoose.connect('mongodb://localhost:27017/mockit-api');

const db = mongoose.connection;
db.on('error', console.error);

const app = new Koa();
const subdomain = new Subdomain();
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
      onerror: (err, ctx) => {
        ctx.throw(422, 'body parse error');
      }
    })
  )
  .use(respond());

router.get('/', ctx => {
  ctx.body = 'Hello world!!!';
});

router.use(user.routes());

router.use(host.routes());

router
  .post('/endpoint', ctx => {
    const {
      body: { method, statusCode, body, path, host }
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

    if (isHasInRouter({ subdomain, host, router, method, path })) {
      return ctx.send(
        405,
        `Route with Path ${path} and Method ${method} has existed already.`
      );
    }
    try {
      subdomain.use(
        host,
        addNewRoute({ router, method, statusCode, body, path }).routes()
      );
      ctx.created('Endpoint created!');
    } catch (err) {
      ctx.send(400, err.message);
    }
  })
  .del('/endpoint', ctx => {
    const { path, method, host } = ctx.request.body;
    if (isHasInRouter({ subdomain, host, router, method, path })) {
      removeRoute({ subdomain, host, router, method, path });
      ctx.ok('Service has been successfully stopped');
    } else {
      ctx.notFound(`Route with Path ${path} and Method ${method} not found.`);
    }
  });

app
  .use(subdomain.routes())
  .use(router.routes())
  .use(router.allowedMethods());

export const server = app.listen(config.get('APP_PORT'), () => {
  console.log(`Server listening on port: ${config.get('APP_PORT')}`);
});
