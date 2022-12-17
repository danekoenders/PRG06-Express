// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: String,
  brand: String,
  options: String,
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("Car", carSchema);