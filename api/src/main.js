import Koa from 'koa';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import jwtMiddleware from 'koa-jwt';
import respond from 'koa-respond';
import Subdomain from 'koa-subdomain';
import cors from '@koa/cors';
import config from 'config';

import host from './routes/host';
import auth from './routes/auth';
import user from './routes/user';

import newRouteHandler from './services/newRoute.service';
import deleteRouteHandler from './services/deleteRoute.service';
import renewRoutes from './services/renewRoutes.service';

import logger from './services/helper/logger';

const app = new Koa();
const subdomain = new Subdomain();
const router = new Router();

// connection to db
require('./db/connection');

const env = process.env.NODE_ENV;

if (env === 'development') {
  app.use(koaLogger());
}

if (env !== 'production') {
  // for proper subdomain detection fix fot localhost:port
  app.subdomainOffset = 1;
}

// for centralized error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

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
  ).use(cors())
  .use(respond());

router.get('/', ctx => {
  ctx.body = 'Hello from mockit API!!!';
  logger.trace(ctx.body);
});


router.use('/auth', auth.routes());

router.use(
  jwtMiddleware({
    secret: config.get('SECRET_JWT')
  })
);

router.use(host.routes());
router.use('/user', user.routes());

router
  .post('/endpoint', async (ctx, next) => {
    await newRouteHandler(ctx, subdomain);
  })
  .del('/endpoint', async (ctx, next) => {
    await deleteRouteHandler(ctx, subdomain);
  });

app
  .use(subdomain.routes())
  .use(router.routes())
  .use(router.allowedMethods());

  app.on('error', (err, ctx) => {
    logger.error(err);
  });
  
app.proxy = true;

export const server = app.listen(config.get('HTTP_PORT'), () => {
  renewRoutes(subdomain);
  logger.info(`Server listening on port: ${config.get('HTTP_PORT')}`);
});
