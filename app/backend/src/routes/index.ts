import { Router } from 'express';
import loginRoute from './loginRoute';
import matchRoutes from './matchRoute';
import teamRoutes from './teamRoute';

const routes = Router();

routes.use(loginRoute);
routes.use(teamRoutes);
routes.use(matchRoutes);

export default routes;
