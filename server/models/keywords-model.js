const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db = require('../db');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;

const keywordSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  french: {
    type: String,
    required: true,
  },
});

autoIncrement.initialize(db.get());

// auto-increment on key when create new
keywordSchema.plugin(autoIncrement.plugin, { model: 'KeywordModel', field: 'key', startAt: 142, });
// get our db & create a model holding our schema in a collection named shops
const KeywordModel = db.get().model('Keyword', keywordSchema);


module.exports = {

  // create a keyword item object
  createOne: (properties) => {
    const model = new KeywordModel(properties);
    return model.save();
  },

  // return one keyword item by key
  readOne: (key) => {
    return KeywordModel.findOne({
      key,
    }).exec();
  },

  // return all keywords in an array
  readAll: () => {
    return KeywordModel.find().exec();
  },

  // find & delete from id
  deleteOne: (key) => {
    return KeywordModel.remove({ key, }).exec();
  },

  // retrieve one by id, then update other fields
  updateOne: (key, properties) => {
    return KeywordModel.findOneAndUpdate({
      key,
    }, {
      $set: properties,
    }, {
      new: true, // return the modified object
    }).exec();
  },
};
