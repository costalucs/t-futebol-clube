import { ITeam } from '../interfaces/ITeam';
import Team from '../database/models/Team';

export default class TeamServices {
  model = Team;
  getAll = async (): Promise<ITeam[]> => {
    const teams = await this.model.findAll();
    return teams;
  };
}
