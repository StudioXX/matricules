const mongoose = require('mongoose');
const db = require('../db');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const documentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  'background-image': {
    type: String,
    required: true,
  },
  'button-link': {
    type: String,
    required: true,
  },
  'button-css': {
    type: String,
    required: false,
  },
});

// get our db & create a model holding our schema in a collection named shops
const DocumentModel = db.get().model('Document', documentSchema);

module.exports = {

  // create an a shop item object
  createOne: (properties) => {
    const model = new ShopModel(properties);
    return model.save();
  },

  // return one shop item by id
  readOne: (id) => {
    return ShopModel.findOne({
      _id: id,
    }).exec();
  },

  // return all shop items in an array
  readAll: () => {
    return ShopModel.find({}).exec();
  },

  // find & delete from id
  deleteById: (id) => {
    return ShopModel.findByIdAndRemove(id).exec();
  },

  // retrieve one by id, then update other fields
  updateById: (id, properties) => {
    debug(properties);
    return ShopModel.findOneAndUpdate({
      _id: id,
    }, {
      $set: properties,
    }, {
      new: true, // return the modified object
    }).exec();
  },
};
