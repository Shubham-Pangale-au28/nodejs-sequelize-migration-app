import { Sequelize } from "sequelize";
import User from "./models/user.js";
import Role from "./models/role.js";
import Supplier from "./models/supplier.js";
import Customer from "./models/customer.js";
import Permission from "./models/permission.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

db.User = User(db.sequelize, db.Sequelize.DataTypes);
db.Role = Role(db.sequelize, db.Sequelize.DataTypes);
db.Supplier = Supplier(db.sequelize, db.Sequelize.DataTypes);
db.Customer = Customer(db.sequelize, db.Sequelize.DataTypes);
db.Permission = Permission(db.sequelize, db.Sequelize.DataTypes);

db.User.belongsToMany(db.Role, { through: "UserRoles" });
db.Role.belongsToMany(db.User, { through: "UserRoles" });
db.Customer.belongsToMany(db.Role, { through: "Customers" });
db.User.belongsToMany(db.Permission, { through: "UserPermissions" });
db.Permission.belongsToMany(db.User, { through: "UserPermissions" });

db.sequelize.sync();
// db.sequelize.sync({ force: true })
export default db;
export { User, Role, Permission, Customer, Supplier };
