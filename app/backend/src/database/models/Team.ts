import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'teams',
    modelName: 'Teams',
    timestamps: false,
  },
);
