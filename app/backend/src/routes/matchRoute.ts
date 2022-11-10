import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import AuthToken from '../middlewares/AuthToken';

const matchRoutes = Router();
const matchController = new MatchController();
const middleware = new AuthToken();

matchRoutes.get('/matches', matchController.getAll);
matchRoutes.patch('/matches/:id', matchController.updateMatch);
matchRoutes.patch('/matches/:id/finish', matchController.finishMatch);
matchRoutes.post('/match', middleware.verifyToken, matchController.addMatch);

export default matchRoutes;
