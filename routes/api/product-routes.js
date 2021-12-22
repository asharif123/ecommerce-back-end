const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{model: Category}, {model: Tag}],
    });
    //successful response, send data as json format if successful
    res.status(200).json(productData);
  } 
  
  catch (err) {
    res.status(500).json(err)
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}],

    })
    res.status(200).json(productData);
  }

  catch (err) {
    res.status(400).json({message: "Product does not exist!"})
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  //create the product database
  //if tag ids exist, take each tag id and assign to product being created
  Product.create(req.body)
  //using .then to grab the created product from database
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
     
      //for each of those tags, combine with product id
      if (req.body.tagIds.length) {
      //take each tag id and map it to the specific product
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
      //bulkCreate - create many tags using bulkCreate and assign to ProductTag
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product, take all the tags from a product, remove old tags and replace with new ones user added
router.put('/:id', (req, res) => {
  // find specific product to update
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all product tag from ProductTag according to its product id
      //note: product tags are associated with each product
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids from specific product
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids, make array of just the ids
      const newProductTags = req.body.tagIds
    //only get me tag ids from data send not in the database
    //first filter only tagids that are not in the newProductTags (ones user inputted) and not in the old productTagsIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
    //then map each tag not in the original productTagIds to a new array associated with specific product
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove, get me all tags that I have and don't include ones that are not in database
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
      //destroy items that are in list of tags to remove
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
      //add new tags that we are updating sent to me
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!productData) {
      res.status(404).json({ message: 'No product data found on that id!' });
      return;
    }
    res.status(200).json(productData);

  }

  catch (error) {
    res.status(500).json(error)
  }

});

module.exports = router;
