import Team from '../database/models/Team';
import { IMatch } from '../interfaces/IMatch';
import Match from '../database/models/Match';

export default class MatchServices {
  private model = Match;
  getAll = async (): Promise<IMatch[] | null> => {
    const matches = await this.model.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };

  getMatches = async (inProgress: boolean): Promise<IMatch[] | null> => {
    const matches = await this.model.findAll(
      {
        include: [
          {
            model: Team,
            as: 'teamHome',
            attributes: { exclude: ['id'] },
          },
          {
            model: Team,
            as: 'teamAway',
            attributes: { exclude: ['id'] },
          },
        ],
        where: { inProgress },

      },
    );
    return matches;
  };

  createMatch = async (matchInfo: Match):Promise<Match | null> => {
    const match = await this.model.create(matchInfo);
    console.log(match);

    return match;
  };

  finishMatch = async (id: string): Promise<null> => {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return null;
  };

  updateMatch = async (id:string, homeGoal: number, awayGoal:number): Promise<number | null> => {
    const [match] = await this.model.update(
      { homeTeamGoals: homeGoal,
        awayTeamGoals: awayGoal },
      { where: { id } },
    );

    return match;
  };
}
