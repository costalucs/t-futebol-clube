import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get('/matches', matchController.getAll);

export default matchRoutes;
