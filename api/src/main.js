import Koa from 'koa';
import Router from 'koa-router';
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

import { loggerKoa, logger } from './services/helper';

const app = new Koa();
const subdomain = new Subdomain();
const router = new Router();

// connection to db
require('./db/connection');

const env = process.env.NODE_ENV;


// FIXME: for proper subdomain detection fix fot localhost:port
app.subdomainOffset = 1;

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
  .use(loggerKoa)
  .use(cors())
  .use(respond());

router.get('/', ctx => {
  ctx.body = 'Hello from mockit API!!!';
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

app.proxy = true;

export const server = app.listen(config.get('HTTP_PORT'), () => {
  renewRoutes(subdomain);
  logger.info(`Server listening on port: ${config.get('HTTP_PORT')}`);
});
