import { ILeaderboard } from '../interfaces/ILeaderboard';

// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.

const sortTable = (table: ILeaderboard[]) => {
  const sortedTable = table.sort((teamA, teamB) => {
    if (teamA.totalPoints > teamB.totalPoints) return -1;
    if (teamA.totalPoints < teamB.totalPoints) return 1;
    if (teamA.goalsBalance > teamB.goalsBalance) return -1;
    if (teamA.goalsBalance < teamB.goalsBalance) return 1;
    if (teamA.goalsFavor > teamB.goalsFavor) return -1;
    if (teamA.goalsFavor < teamB.goalsFavor) return 1;
    if (teamA.goalsOwn > teamB.goalsOwn) return -1;
    if (teamA.goalsOwn < teamB.goalsOwn) return 1;
    return 0;
  });

  return sortedTable;
};

// efficiency [P / (J * 3)] * 100
const efficiencyCalc = (points: number, games:number):number => (points / (games * 3)) * 100;

function combineTable(homeTable: ILeaderboard[], awayTable: ILeaderboard[]) {
  const table = homeTable.map((teamHome: ILeaderboard) => {
    const awayTeam = awayTable.find((teamAway) => teamAway.name === teamHome.name) as ILeaderboard;
    return { name: teamHome.name,
      totalPoints: (+teamHome.totalPoints) + (+awayTeam.totalPoints),
      totalGames: (+teamHome.totalGames) + (+awayTeam.totalGames),
      totalVictories: (+teamHome.totalVictories) + (+awayTeam.totalVictories),
      totalDraws: (+teamHome.totalDraws) + (+awayTeam.totalDraws),
      totalLosses: (+teamHome.totalLosses) + (+awayTeam.totalLosses),
      goalsFavor: (+teamHome.goalsFavor) + (+awayTeam.goalsFavor),
      goalsOwn: (+teamHome.goalsOwn) + (+awayTeam.goalsOwn),
      goalsBalance: ((+teamHome.goalsFavor) + (+awayTeam.goalsFavor))
      - ((+teamHome.goalsOwn) + (+awayTeam.goalsOwn)),
      efficiency: efficiencyCalc(
        (+teamHome.totalPoints) + (+awayTeam.totalPoints),
        (+teamHome.totalGames) + (+awayTeam.totalGames),
      ).toFixed(2) };
  });
  return sortTable(table as unknown as ILeaderboard[]);
}

export default combineTable;
