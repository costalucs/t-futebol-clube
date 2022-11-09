import { Router } from 'express';
import leaderboardRoute from './leaderboardRoutes';
import loginRoute from './loginRoute';
import matchRoutes from './matchRoute';
import teamRoutes from './teamRoute';
import swaggerRoute from './swaggerRoute';

const routes = Router();

routes.use(loginRoute);
routes.use(teamRoutes);
routes.use(matchRoutes);
routes.use(leaderboardRoute);
routes.use(swaggerRoute);

export default routes;
