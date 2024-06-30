const { sendError, errorCreationHandeling, errorHandeling} = require("../utils/errors")
const { DEFAULT } = require("../utils/errorConstants");
const ClothingItem = require("../models/clothingitems");


const getItems = (req, res) => {
  ClothingItem.find()
    .then(items => res.send(items))
    .catch(error => sendError(DEFAULT, FORBIDDEN, error, res));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then(item => res.status(201).send(item))
    .catch(error => errorCreationHandeling(error, res));
};

const deleteItem = (req, res) => {

  ClothingItem.findById(req.params.id)
  .orFail()
    .then(item=>{
      if(!item.owner.equals(req.user._id))
        return sendError(FORBIDDEN, { message: 'Forbidden: You do not have permission to delete this item' }, res)

      return ClothingItem.findByIdAndDelete(req.params.id)
    })
    .then(()=> res.send({ message: 'Item deleted successfully' }))
    .catch(error => errorHandeling(error, res));
};

const likeItem = (req, res) =>{
  console.log("like");
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
  .orFail()
  .then(item => res.send(item))
  .catch(error => errorHandeling(error, res));
}

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
  .orFail()
  .then(item => res.send(item))
  .catch(error => errorHandeling(error, res));
}

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };