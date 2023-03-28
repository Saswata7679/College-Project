const mongoose = require("mongoose");
const validator = require("validator");

const testdriveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    
  },
  phoneno: {
    type: Number,
    required: [true, "Please Enter Your Phone Number"],
    
  },
  andharno: {
    type: String,
    required: [true, "Please Enter Andhar Card Number"],

  },
  carname: {
    type: String,
    required: [true, "Please Enter Carname"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Testdrive", testdriveSchema);
