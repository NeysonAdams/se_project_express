const router = require("express").Router();
const { createItem, deleteItem, likeItem, dislikeItem } = require("../controllers/clothingitems")
const { validateCreateClothingItem, validateId } = require('../middlewares/validation');

router.post ("/", validateCreateClothingItem, createItem);
router.delete("/:id",validateId,deleteItem);
router.put('/:id/likes', validateId, likeItem);
router.delete("/:id/likes", validateId ,dislikeItem);

module.exports = router;