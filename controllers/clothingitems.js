const { sendError, errorCreationHandeling, errorHandeling} = require("../utils/errors")
const ClothingItem = require("../models/clothingitems");


const getItems = (req, res) => {
  ClothingItem.find()
    .then(items => res.status(200).send(items))
    .catch(error => sendError(500, error, res));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then(item => res.status(201).send(item))
    .catch(error => errorCreationHandeling(error, res));
};

const deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.id)
  .orFail()
    .then(()=> res.status(200).send({ message: 'Item deleted successfully' }))
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
  .then(item => res.status(200).send(item))
  .catch(error => errorHandeling(error, res));
}

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
  .orFail()
  .then(item => res.status(200).send(item))
  .catch(error => errorHandeling(error, res));
}

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };