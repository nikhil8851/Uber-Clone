const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Define schema
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  socketID: {
    type: String,
  },
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _key: this._key }, process.env.JWT_SECRET_KEY);
  return token;
};

// Compare plain password with hashed one
userSchema.methods.comparePass = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Hash password
userSchema.methods.hashPass = async function (plainPassword) {
  return await bcrypt.hash(plainPassword, 10);
};


// create models
const usermodel = mongoose.model('user',userSchema)


// exprot usermodel
module.exports = usermodel