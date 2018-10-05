import RouteModel from '../../models/Route';

const handler = async ctx => {
  const { method, url, hostname } = ctx;
  const host = hostname.replace(/.(\w*)$/, '');

  const dbRoute = await RouteModel.findOne({
    host,
    method,
    path: url
  });

  if (!dbRoute) {
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
