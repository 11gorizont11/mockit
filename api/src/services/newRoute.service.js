import RouteModel from '../models/Route';

import { addNewRoute, isHasInRouter, validateFields } from './helper';

const schema = {
  statusCode: { type: 'Number', require: true },
  path: { type: 'String', require: true },
  method: { type: 'String', require: true },
  headers: { type: 'Array' },
  body: { type: 'Object' }
};

const newRouteHandler = async (ctx, router, subdomain) => {
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
      method,
      statusCode,
      body,
      path,
      headers
    });

    const dbRouter = await RouteModel.create({
      route: JSON.stringify(ctx.request.body),
      userId
    });

    if (!dbRouter) {
      return ctx.internalServerError('Oops... something went wrong.');
    }

    subdomain.use(host, newRoute.routes());

    return ctx.created({
      message: 'Endpoint created!',
      routeId: dbRouter.id
    });
  } catch (err) {
    return ctx.send(400, err.message);
  }
};

export default newRouteHandler;
