export const addNewRoute = ({ router, method, statusCode, body, path }) => {
  const handler = ctx => {
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
