const { ForbiddenError } = require("../utils/errors")
const ClothingItem = require("../models/clothingitems");


const getItems = (req, res, next) => {
  ClothingItem.find()
    .then(items => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then(item => res.status(201).send(item))
    .catch(next);
};

const deleteItem = (req, res, next) => {

  ClothingItem.findById(req.params.id)
  .orFail()
    .then(item=>{
      if(!item.owner.equals(req.user._id))
        throw new ForbiddenError('Forbidden: You do not have permission to delete this item')

      return ClothingItem.findByIdAndDelete(req.params.id)
        .then(()=> res.send({ message: 'Item deleted successfully' }))
    })
    .catch(next);
};

const likeItem = (req, res, next) =>{
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
  .orFail()
  .then(item => res.send(item))
  .catch(next);
}

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
  .orFail()
  .then(item => res.send(item))
  .catch(next);
}

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };