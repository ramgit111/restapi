// db schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Structure

let Product = new Schema(
  // schema design of each field
  {
    // _id: { type: String },
    title: { type: String, required: true, minlength: 3 },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now }
  },
  // collection string
  {
    collection: 'products'
  }
);

module.exports = mongoose.model('Product', Product);
