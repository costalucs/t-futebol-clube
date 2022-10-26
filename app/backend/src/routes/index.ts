import { Router } from 'express';
import loginRoute from './loginRoute';

const routes = Router();

routes.use(loginRoute);

export default routes;
