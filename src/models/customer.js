import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
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
      modelName: "Customer",
    }
  );
  return Customer;
};
