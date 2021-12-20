const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

//ProductTag references each product and individual tag
ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
//a product can have many product ids
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        name: 'product',
        type: 'id',
      }
    },

    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        name: 'tag',
        type: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
