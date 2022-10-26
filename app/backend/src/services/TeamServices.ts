import { ITeam } from '../interfaces/ITeam';
import Team from '../database/models/Team';

export default class TeamServices {
  model = Team;
  getAll = async (): Promise<ITeam[]> => {
    const teams = await this.model.findAll();

    return teams;
  };

  // getOne = async (idTeam: number): Promise<ITeam | null> => {
  //   console.log(idTeam);

  //   const team: Team | null = await this.model.findOne({
  //     where: {
  //       id: idTeam,
  //     },
  //   });
  //   console.log(team);

  //   return team as Team;
  // };
}
