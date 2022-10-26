import { Request, Response } from 'express';
import TeamServices from '../services/TeamServices';
import Team from '../database/models/Team';

const teamService = new TeamServices();

export default class TeamController {
  getAll = async (req: Request, res: Response) => {
    const teams = await teamService.getAll();

    return res.status(200).json(teams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await Team.findOne({ where: { id } });
    if (!team) return res.status(400).json({ message: 'Team not found' });

    return res.status(200).json(team);
  };
}
