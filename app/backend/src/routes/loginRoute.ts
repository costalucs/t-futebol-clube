import { Router } from 'express';
import UserController from '../controllers/UserController';

const loginRoute = Router();
const userController = new UserController();

loginRoute.get('/login', userController.getAll);
loginRoute.post('/login', userController.login);

export default loginRoute;
