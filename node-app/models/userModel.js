const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true},
  password: { type: String },
  
  phoneNumber: { type: String },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
  token: { type: String },
  active: { type: Number}, 
  isDelete: { type: Number}, 
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;