import { Router } from 'express';
import AuthToken from '../middlewares/AuthToken';
import MatchController from '../controllers/MatchController';

const matchRoutes = Router();
const matchController = new MatchController();
const middleware = new AuthToken();

matchRoutes.get('/matches', matchController.getAll);
matchRoutes.patch('/matches/:id', matchController.updateMatch);
matchRoutes.patch('/matches/:id/finish', matchController.finishMatch);
matchRoutes.post('/matches', middleware.verifyToken, matchController.addMatch);

export default matchRoutes;
