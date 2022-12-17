// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: String,
  brand: String,
  options: String,
});

// Add vitual property to car, to include (dynamic) links
carSchema.virtual('_links').get(
  function () {
    return {
      
    }
  }
)

// Export function to create "SomeModel" model class
module.exports = mongoose.model("Car", carSchema);