import { Router } from 'express';
import UserController from '../controllers/UserController';

const loginRoute = Router();
const userController = new UserController();

loginRoute.get('/login/validate', userController.verifyLogin);
loginRoute.post('/login', userController.login);

export default loginRoute;
