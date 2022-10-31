export const getAllHomeTable = `
SELECT 
    team.team_name name,
    SUM(matches.home_team_goals > matches.away_team_goals) * 3 
    + SUM(matches.home_team_goals = matches.away_team_goals) 'totalPoints',
    COUNT(matches.home_team) 'totalGames',
    SUM(matches.home_team_goals > matches.away_team_goals) 'totalVictories',
    SUM(matches.home_team_goals = matches.away_team_goals) 'totalDraws',
    SUM(matches.home_team_goals < matches.away_team_goals) 'totalLosses',
    SUM(matches.home_team_goals) 'goalsFavor',
    SUM(matches.away_team_goals) 'goalsOwn',
    SUM(matches.home_team_goals - matches.away_team_goals) 'goalsBalance',
    ((SUM(matches.home_team_goals > matches.away_team_goals) * 3 + 
    SUM(matches.home_team_goals = matches.away_team_goals)) / 
    ((COUNT(matches.home_team)) * 3) * 100) efficiency
    FROM
    teams team
        INNER JOIN
    matches matches ON team.id = matches.home_team
WHERE
    matches.in_progress = FALSE
GROUP BY team.team_name
ORDER BY totalPoints DESC , totalVictories DESC , goalsBalance DESC , goalsFavor DESC;`;

export const getAllAwayTable = `
SELECT 
    team.team_name name,
    SUM(matches.away_team_goals > matches.home_team_goals) * 3 
    + SUM(matches.home_team_goals = matches.away_team_goals) totalPoints,
    COUNT(matches.away_team) totalGames,
    SUM(matches.away_team_goals > matches.home_team_goals) 'totalVictories',
    SUM(matches.away_team_goals = matches.home_team_goals) 'totalDraws',
    SUM(matches.away_team_goals < matches.home_team_goals) 'totalLosses',
    SUM(matches.away_team_goals) 'goalsFavor',
    SUM(matches.home_team_goals) 'goalsOwn',
    SUM(matches.away_team_goals - matches.home_team_goals) 'goalsBalance',
    ((SUM(matches.away_team_goals > matches.home_team_goals) * 3 
    + SUM(matches.home_team_goals = matches.away_team_goals)) / 
    ((COUNT(matches.away_team)) * 3) * 100) efficiency
FROM
    teams team
        INNER JOIN
    matches matches ON team.id = matches.away_team
WHERE
    matches.in_progress = FALSE
GROUP BY team.team_name
ORDER BY totalPoints DESC , totalVictories DESC , goalsBalance DESC , goalsFavor DESC;`;
