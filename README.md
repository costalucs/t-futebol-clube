# :construction: README em construção ! :construction:
<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->

## Endpoints da API:

#### Login

|Método |Funcionalidade                                                                     |URL                                          |
|:-----:|:---------------------------------------------------------------------------------:|:-------------------------------------------:|
|`POST` |Realiza login do usuário e retorna um token para autenticação                      |http://localhost:3001/login                  |
|`GET`  |Verifica se o usuário está logado e retorna a sua função (administrador ou usuário)|http://localhost:3001/login/validate         |

Na requisição `POST`, é necessário informar um JSON no seguinte formato:

```
{
  "email": "admin@admin.com",
  "password": "secret_admin"
}
```

#### Times

|Método |Funcionalidade                                                                    |URL                                           |
|:-----:|:--------------------------------------------------------------------------------:|:--------------------------------------------:|
|`GET`  |Retorna todos os times cadastrados no banco de dados                              |http://localhost:3001/teams                   |
|`GET`  |Retorna um time específico com base em seu ID                                     |http://localhost:3001/teams/:id               |

#### Partidas

|Método |Funcionalidade                                                                    |URL                                           |
|:-----:|:--------------------------------------------------------------------------------:|:--------------------------------------------:|
|`GET`  |Retorna todas as partidas do campeonato                                           |http://localhost:3001/matches                 |
|`GET`  |Retorna as partidas que estão em andamento                                        |http://localhost:3001/matches?inProgress=true |
|`GET`  |Retorna as partidas já finalizadas                                                |http://localhost:3001/matches?inProgress=false|
|`POST` |Cadastra uma nova partida e retorna esta partida cadastrada                       |http://localhost:3001/matches                 |
|`PATCH`|Finaliza uma partida em andamento baseado em seu ID                               |http://localhost:3001/matches/:id/finish      |
|`PATCH`|Atualiza o resultado de uma partida em andamento com base em seu ID               |http://localhost:3001/matches/:id             |


Na requisição `POST` é necessário informar um JSON no seguinte formato:

```
{
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}
```


Na requisição `PATCH` que atualiza o resultado é necessário informar um JSON no seguinte formato:

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

#### Classificação

|Método |Funcionalidade                                                                    |URL                                           |
|:-----:|:--------------------------------------------------------------------------------:|:--------------------------------------------:|
|`GET`  |Retorna a classificação dos times da casa com base nas partidas já finalizadas    |http://localhost:3001/leaderboard/home        |
|`GET`  |Retorna a classificação dos times visitantes com base nas partidas já finalizadas |http://localhost:3001/leaderboard/away        |
|`GET`  |Retorna a classificação geral com base nas partidas já finalizadas                |http://localhost:3001/leaderboard             |
