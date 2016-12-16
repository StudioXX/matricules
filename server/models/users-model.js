const mongoose = require('mongoose');
const db = require('../db');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // role: {
  //   type: String,
  //   enum: ['Editor', 'Admin', 'Member'],
  //   default: 'Member',
  // },
},
  {
    timestamps: true,
  });

const UserModel = db.get().model('User', userSchema);

module.exports = {
  // create an a document item object
  createOne: (properties) => {
    const model = new UserModel(properties);
    return model.save();
  },

  // return one document item by accession_number
  readOne: (username) => {
    return UserModel.findOne({
      username,
    }).exec();
  },

  // // return all document items in an array
  // readSelect: (properties) => {
  //     console.log('read select');
  //   return DocumentModel.find(properties).exec();
  // },

  // // find & delete from id
  // deleteById: (id) => {
  //   return DocumentModel.findByIdAndRemove(id).exec();
  // },

  // // retrieve one by id, then update other fields
  // updateById: (id, properties) => {
  //   return DocumentModel.findOneAndUpdate({
  //     _id: id,
  //   }, {
  //     $set: properties,
  //   }, {
  //     new: true, // return the modified object
  //   }).exec();
  // },
};
