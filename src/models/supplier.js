import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Supplier extends Model {
    static associate(models) {
      // define association here
    }
  }
  Supplier.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Supplier",
    }
  );
  return Supplier;
};
