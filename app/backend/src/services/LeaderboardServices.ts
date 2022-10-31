import db from '../database/models';
import getAllHomeTable from '../utils/querys';

export default class LeaderBoardServices {
  getAllHome = async () => {
    const [table] = await db.query(getAllHomeTable);

    return table;
  };
}
