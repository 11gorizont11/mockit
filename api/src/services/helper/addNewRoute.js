import Router from 'koa-router';

const router = new Router();

export const addNewRoute = ({ method, statusCode, body, path, headers }) => {
  const handler = async ctx => {
    headers.forEach(header => {
      Object.keys(header).forEach(key => {
        ctx.set(key, header[key]);
      });
    });

    ctx.status = statusCode;
    ctx.body = body;
  };

  let newRoute;
  switch (method) {
    case 'GET':
      newRoute = router.get(`${path}`, handler);
      break;
    case 'POST':
      newRoute = router.post(`${path}`, handler);
      break;
    case 'PUT':
      newRoute = router.put(`${path}`, handler);
      break;
    case 'DELETE':
      newRoute = router.del(`${path}`, handler);
      break;
    case 'PATCH':
      newRoute = router.patch(`${path}`, handler);
      break;
    default:
      throw new Error(`Method ${method} not allowed.`);
  }
  return newRoute;
};
