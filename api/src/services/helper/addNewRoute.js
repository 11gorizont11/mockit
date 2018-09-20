import Router from 'koa-router';
import handler from './subdomainHandler';

const router = new Router();

export const addNewRoute = ({ method, statusCode, body, path, headers }) => {
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
