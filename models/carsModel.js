// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: String,
  brand: String,
  options: String,
}, { toJSON: {virtuals: true} });

// Add vitual property to car, to include (dynamic) links
carSchema.virtual('_links').get(
  function () {
    return {
      self: {
        href: `${process.env.BASE_URI}cars/${this._id}`
      },
      collection: {
        href: `${process.env.BASE_URI}cars/`
      }
    }
  }
)

// Export function to create "SomeModel" model class
module.exports = mongoose.model("Car", carSchema);