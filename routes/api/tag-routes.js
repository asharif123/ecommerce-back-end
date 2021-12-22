const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],

    })
    res.status(200).json(tagData);
  }

  catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: {model: Product},
    })
    res.status(200).json(tagData);
  }

  catch  {
    res.status(404).json({message: "Tag does not exist!"})
  }
});

router.post('/', async (req, res) => {
  // create a new tag, if there are productIds, take each id and map it to the created tag
  try {
    const createTagData = await Tag.create(req.body);
    
    res.status(200).json(createTagData);

  }
  catch (err) {
    res.status(400).json({ message: "Invalid data format!"})
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
    Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then((tag) => 
      res.status(200).json({message: "Tag has been updated!"})
    ) 
    .catch((err) => 
      res.status(400).json({message: "Tag does not exist!"})
    )
 

  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!tagData) {
      res.status(404).json({ message: 'No tag data found on that id!' });
      return;
    }
    //if data exists, return the tag data
    res.status(200).json({ message: 'Successfully deleted!' });

  }

  catch {
    res.status(500).json(err)
  }
});

module.exports = router;
