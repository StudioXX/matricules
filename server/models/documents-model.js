const mongoose = require('mongoose');
const db = require('../db');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;

const documentSchema = new Schema({
  accession_number: {
    type: String,
    required: true,
  },
  keywords: {
    type: Array,
    required: false,
  },
  medium: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  categorie: {
    type: String,
    required: true,
  },
  support: {
    type: String,
    required: false,
  },
  links: {
    type: Array,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  description_fr: {
    type: String,
    required: false,
  },
  sujet_fr: {
    type: String,
    required: false,
  },
  sujet: {
    type: String,
    required: false,
  },
  physical_description: {
    type: String,
    required: false,
  },
  videos: {
    type: Array,
    required: false,
  },
  images: {
    type: Array,
    required: false,
  },
  audio: {
    type: Array,
    required: false,
  },
  otherfiles: {
    type: Array,
    required: false,
  },
});

// get our db & create a model holding our schema in a collection named shops
const DocumentModel = db.get().model('Document', documentSchema);

module.exports = {

  // create an a document item object
  createOne: (properties) => {
    const model = new DocumentModel(properties);
    return model.save();
  },

  // return one document item by accession_number
  readOne: (accession) => {
    return DocumentModel.findOne({
      accession_number: accession,
    }).exec();
  },

  // return all document items in an array
  readSelect: (properties) => {
      console.log('read select');
    return DocumentModel.find(properties).exec();
  },

  // find & delete from id
  deleteById: (id) => {
    return DocumentModel.findByIdAndRemove(id).exec();
  },

  // retrieve one by id, then update other fields
  updateById: (id, properties) => {
    return DocumentModel.findOneAndUpdate({
      _id: id,
    }, {
      $set: properties,
    }, {
      new: true, // return the modified object
    }).exec();
  },
};
