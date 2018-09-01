const isHasInRouter = ({ router, method, path }) =>
  router.stack.some(
    item => item.path === path && item.methods.includes(method)
  );

export const addNewRoute = (router, req) => {
  const { method, statusCode, body, path } = req;
  if (isHasInRouter({ router, method, path })) {
    throw new Error(
      `Route with Path ${path} and Method ${method} has existed already.`
    );
  }
  switch (method) {
    case 'POST':
      router.post(`${path}`, ctx => {
        ctx.status = statusCode;
        ctx.body = body;
      });
      break;
    case 'PUT':
      router.put(`${path}`, ctx => {
        ctx.status = statusCode;
        ctx.body = body;
      });
      break;
    case 'DELETE':
      router.put(`${path}`, ctx => {
        ctx.status = statusCode;
        ctx.body = body;
      });
      break;
    default:
      router.get(`${path}`, ctx => {
        ctx.status = statusCode;
        ctx.body = body;
      });
      break;
  }
};
