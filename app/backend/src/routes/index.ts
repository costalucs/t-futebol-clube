import { Router } from 'express';
import loginRoute from './loginRoute';
import teamRoutes from './teamRoute';

const routes = Router();

routes.use(loginRoute);
routes.use(teamRoutes);

export default routes;
