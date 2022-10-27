import { Request, Response } from 'express';
import MatchServices from '../services/MatchServices';

const matchServices = new MatchServices();

export default class MatchController {
  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    let matches;
    if (inProgress) {
      if (inProgress === 'true') {
        matches = await matchServices.getMatches(true);
        return res.status(200).json(matches);
      }
      matches = await matchServices.getMatches(false);
      return res.status(200).json(matches);
    }
    matches = await matchServices.getAll();

    return res.status(200).json(matches);
  };
}
