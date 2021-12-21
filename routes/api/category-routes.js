//part of modularization
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//wait for category to grab all the category data before we get the info from the root link
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products (note a category can have many products)
  try {
    const categoryData = await Category.findAll({
      include: {model: Product},
    });
    //successful response, send data as json format if successful
    res.status(200).json(categoryData);
  } 
  
  catch (err) {
    res.status(500).json(err)
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findByPk(req.params.id, {
      include: {model: Product},
    })
    res.status(200).json(categoryInfo);
  } 
  
  catch  {
  //return 404 error if category is not found
    res.status(404).json({ message: 'No category found with that id!' });
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategoryData = await Category.create(req.body)
    res.status(200).json(createCategoryData);
  } 
  
  catch (err) {
    res.status(400).json({ message: "Invalid data format!"})
  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({message: "Category has been updated!"})
  }

  catch (err) {
    res.status(400).json({message: "Category does not exist!"})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No category data found on that id!' });
      return;
    }
    res.status(200).json(categoryData);

  }

  catch {
    res.status(500).json(err)
  }
});

module.exports = router;
