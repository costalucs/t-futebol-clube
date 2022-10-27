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
}
