import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, { through: "RolePermissions" });
    }
  }
  Permission.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
