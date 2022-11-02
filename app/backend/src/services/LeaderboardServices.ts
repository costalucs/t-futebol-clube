import combineTables from '../utils/combineTables';
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

  getTable = async (): Promise<ILeaderboard[] | null> => {
    const [homeTable] = await db.query(getAllHomeTable);
    const [awayTAble] = await db.query(getAllAwayTable);

    const table = combineTables(homeTable as ILeaderboard[], awayTAble as ILeaderboard[]);

    return table as unknown as ILeaderboard[];
  };
}
