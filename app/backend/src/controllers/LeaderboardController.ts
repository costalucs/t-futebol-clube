import { Request, Response } from 'express';
import LeaderBoardServices from '../services/LeaderboardServices';

const leaderboardServices = new LeaderBoardServices();

export default class LeaderboardController {
  getLeaderboardHome = async (req: Request, res: Response) => {
    const table = await leaderboardServices.getAllHome();

    return res.status(200).json(table);
  };
}
