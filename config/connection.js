const Sequelize = require('sequelize');
require("dotenv").config();
//note: must be in order dbname, dbusername, and dbpassword
const sequelize = new Sequelize(
  process.env.dbname,
  process.env.dbusername,
  process.env.dbpassword,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;
