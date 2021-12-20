const Sequelize = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.dbusername,
  process.env.dbpassword,
  process.env.dbname,
  
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;
