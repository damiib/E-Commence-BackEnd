const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    const productTags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(productTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    const singleTag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const destroyTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(destroyTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
