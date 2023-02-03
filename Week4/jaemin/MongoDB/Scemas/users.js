const mongoose = require('mongoose');
const { Schema } = mongoose;
/**
 * 이름, 나이, 결혼여부, 자기소개, 생성일
 */
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  }
})

module.exports = mongoose.model('User',userSchema);