export const addNewRoute = ({ router, method, statusCode, body, path }) => {
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
