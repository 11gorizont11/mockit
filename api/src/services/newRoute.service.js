import Subdomain from 'koa-subdomain';
import Router from 'koa-router';
import RouteModel from '../models/Route';

import { addNewRoute, isHasInRouter, validateFields } from './helper';

const router = new Router();
const subdomain = new Subdomain();

const schema = {
  statusCode: { type: 'Number', require: true },
  path: { type: 'String', require: true },
  method: { type: 'String', require: true },
  headers: { type: 'Array' },
  body: { type: 'Object' }
};

const newRouteHandler = async ctx => {
  const {
    body: { method, statusCode, body, path, host, headers }
  } = ctx.request;

  const { id: userId } = ctx.state.user;

  const errors = validateFields(ctx.request.body, schema);

  if (errors.length) {
    return ctx.send(400, { message: errors });
  }

  if (isHasInRouter({ subdomain, host, router, method, path })) {
    return ctx.send(
      405,
      `Route with Path ${path} and Method ${method} has existed already.`
    );
  }

  try {
    const newRoute = addNewRoute({
      router,
      method,
      statusCode,
      body,
      path,
      headers
    });

    subdomain.use(host, newRoute.routes());

    await RouteModel.create({
      route: JSON.stringify(newRoute),
      userId
    });

    ctx.created('Endpoint created!');
  } catch (err) {
    ctx.send(400, err.message);
  }
};

export default newRouteHandler;
