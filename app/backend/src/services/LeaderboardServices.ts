import { ILeaderboard } from '../interfaces/ILeaderboard';
import db from '../database/models';
import { getAllAwayTable, getAllHomeTable } from '../utils/querys';

export default class LeaderBoardServices {
  getAllHome = async (): Promise<ILeaderboard[] | null> => {
    const [table] = await db.query(getAllHomeTable);

    return table as ILeaderboard[];
  };

  getAllAway = async (): Promise<ILeaderboard[] | null> => {
    const [table] = await db.query(getAllAwayTable);
    return table as ILeaderboard[];
  };
}
