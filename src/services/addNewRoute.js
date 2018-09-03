export const addNewRoute = ({ router, method, statusCode, body, path }) => {
  const handler = ctx => {
    ctx.status = statusCode;
    ctx.body = body;
  };

  switch (method) {
    case 'GET':
      router.get(`${path}`, handler);
      break;
    case 'POST':
      router.post(`${path}`, handler);
      break;
    case 'PUT':
      router.put(`${path}`, handler);
      break;
    case 'DELETE':
      router.del(`${path}`, handler);
      break;
    case 'PATCH':
      router.patch(`${path}`, handler);
    default:
      throw new Error(`Method ${method} not allowed.`);
  }
};
