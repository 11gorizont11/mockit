import RouteModel from '../../models/Route';
import { logger } from './logger';

const handler = async (ctx) => {
  const { method, url, hostname } = ctx;
  const host = hostname.replace(/.(\w*)$/, '');

  const dbRoute = await RouteModel.findOne({
    host,
    method,
    path: url
  });

  if (!dbRoute) {
    logger.warn(`${host} ${method} ${url} was not found`)
    return ctx.notFound('Route not found');
  }

  const { body, headers, statusCode } = dbRoute;

  if (headers.length) {
    headers.forEach(header => {
      ctx.set(header.key, header.value);
    });
  }

  ctx.status = statusCode;
  ctx.body = JSON.parse(body);
};

export default handler;
