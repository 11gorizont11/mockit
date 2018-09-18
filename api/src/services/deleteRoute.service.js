import Subdomain from 'koa-subdomain';
import Router from 'koa-router';
import { isHasInRouter, removeRoute } from './helper';

const router = new Router();
const subdomain = new Subdomain();

const deleteRouteHandler = async ctx => {
  const { path, method, host } = ctx.request.body;
  if (isHasInRouter({ subdomain, host, router, method, path })) {
    removeRoute({ subdomain, host, router, method, path });

    ctx.ok('Service has been successfully stopped');
  } else {
    ctx.notFound(`Route with Path ${path} and Method ${method} not found.`);
  }
};

export default deleteRouteHandler;
