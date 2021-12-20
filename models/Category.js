//import model library from sequelize
const { Model, DataTypes } = require('sequelize');

//connect to the database
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    // Model tableName will be the same as the model name
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
