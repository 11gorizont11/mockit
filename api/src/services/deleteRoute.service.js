import { removeRoute } from './helper';
import RouteModel from '../models/Route';

const deleteRouteHandler = async (ctx, subdomain) => {
  const { routeId } = ctx.request.body;
  const { id: userId } = ctx.state.user;

  if (!routeId) {
    return ctx.badRequest('routeId is required.');
  }

  try {
    const dbRoute = await RouteModel.findOneAndDelete({
      _id: routeId,
      userId
    })

    const { host, method, path } = dbRoute;
    removeRoute({ subdomain, host, method, path });
    return ctx.ok('Service has been successfully stopped');
  }

  catch (err) {
    return ctx.notFound(
      `Route not found.`
    );
  }
};

export default deleteRouteHandler;
