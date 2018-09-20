import RouteModel from '../models/Route';
import { addNewRoute } from './helper';

const renewRoutes = async subdomain => {
  const dbRoutes = await RouteModel.find({});
  if (dbRoutes.length) {
    dbRoutes.forEach(item => {
      const { method, statusCode, body, path, headers, host } = item;
      const parsedBody = JSON.parse(body);
      const newRoute = addNewRoute({
        method,
        statusCode,
        body: parsedBody,
        path,
        headers
      });
      subdomain.use(host, newRoute.routes());
    });
    console.log(`${dbRoutes.length} was added successfully!`);
  }
};

export default renewRoutes;
