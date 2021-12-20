
//this is used to define model relationships (belongsTo, hasMany, etc.)
// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
//each product belongs to a certain category but a category can have many products (ex: plaid and denim shirts belong to "shirt")

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
