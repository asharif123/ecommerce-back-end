
//this is used to define model relationships (belongsTo, hasMany, etc.)
// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
//each product belongs to a certain category but a category can have many products (ex: plaid and denim shirts belong to "shirt")

// Products belongsTo Category
Product.belongsTo(Category);
// Categories have many Products
Category.hasMany(Product);

//MANY TO MANY RELATIONSHIP
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag });
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag });
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
