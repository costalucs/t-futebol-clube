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

  addMatch = async (req: Request, res: Response) => {
    const match = req.body;

    if (match.homeTeam === match.awayTeam) {
      return res
        .status(422).json({ message: 'It is not possible to create a match with two equal teams' });
    }
    let infos;
    try {
      infos = await matchServices.createMatch(match);
    } catch (err) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    console.log(infos);

    return res.status(201).json(infos);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await matchServices.finishMatch(id);
    return res.status(200).json({ message: 'Finished' });
  };
}
