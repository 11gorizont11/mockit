import { isHasInRouter, removeRoute } from './helper';
import RouteModel from '../models/Route';

const deleteRouteHandler = async (ctx, router, subdomain) => {
  const { path, method, host, routeId } = ctx.request.body;

  if (!path || !method || !host || !routeId) {
    return ctx.badRequest('path, method, host, routeId fields are required.');
  }

  const { id: userId } = ctx.state.user;

  if (isHasInRouter({ subdomain, host, router, method, path })) {
    removeRoute({ subdomain, host, router, method, path });
    try {
      const s = await RouteModel.findById(routeId);

      await RouteModel.deleteOne({
        _id: routeId,
        userId
      });

      return ctx.ok('Service has been successfully stopped');
    } catch (err) {
      ctx.internalServerError('Oops! Something went wrong...');
    }
  } else {
    return ctx.notFound(
      `Route with Path ${path} and Method ${method} not found.`
    );
  }
};

export default deleteRouteHandler;
