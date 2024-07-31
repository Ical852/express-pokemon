import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/database";

class Pokemon extends Model {
  public id!: number;
  public url!: string;
  public nickname!: string;
  public fibonacciIndex!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fibonacciIndex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "pokemons",
  }
);

export default Pokemon;
