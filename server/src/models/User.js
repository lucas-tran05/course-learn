const mongodb = require('mongoose');

const isValidDate = (dateString) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
  return regex.test(dateString);
};

const UserSchema = new mongodb.Schema({
  name: {
    type: String,
    required: true
  },
  stuID: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  admin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  gender: {
    type: Boolean,
    required: false,
    default: true,
  },
  birth: {
    type: Date,
    required: false,
    validate: {
      validator: isValidDate,
    }
  },
  major: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongodb.model('User', UserSchema);
