import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRoutes = Router();
const teamControler = new TeamController();

teamRoutes.get('/teams', teamControler.getAll);
teamRoutes.get('/teams/:id', teamControler.getById);

export default teamRoutes;
