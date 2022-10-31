import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoute = Router();
const leaderboardController = new LeaderboardController();

leaderboardRoute.get('/leaderboard/home', leaderboardController.getLeaderboardHome);
leaderboardRoute.get('/leaderboard/away', leaderboardController.getLeaderboardAway);

export default leaderboardRoute;
