import { Request, Response } from 'express';
import MatchServices from '../services/MatchServices';

const matchServices = new MatchServices();

export default class MatchController {
  getAll = async (req: Request, res: Response) => {
    const matches = await matchServices.getAll();

    return res.status(200).json(matches);
  };
}
