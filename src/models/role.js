import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, { through: "UserRoles" });
      Role.belongsToMany(models.Permission, { through: "RolePermissions" });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
