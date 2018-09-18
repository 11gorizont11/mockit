import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import jwtMiddleware from 'koa-jwt';
import respond from 'koa-respond';
import Subdomain from 'koa-subdomain';
import config from 'config';
// FIXME: move to one file
import host from './routes/host';
import auth from './routes/auth';
// FIXME: move to one file
import newRouteHandler from './services/newRoute.service';
import deleteRouteHandler from './services/deleteRoute.service';

const app = new Koa();
const subdomain = new Subdomain();
const router = new Router();

// connection to db
require('./db/connection');

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

router.use('/auth', auth.routes());

router.use(
  jwtMiddleware({
    secret: config.get('SECRET_JWT')
  })
);

router.use(host.routes());

router.post('/endpoint', newRouteHandler).del('/endpoint', deleteRouteHandler);

app
  .use(subdomain.routes())
  .use(router.routes())
  .use(router.allowedMethods());

export const server = app.listen(config.get('APP_PORT'), () => {
  console.log(`Server listening on port: ${config.get('APP_PORT')}`);
});
