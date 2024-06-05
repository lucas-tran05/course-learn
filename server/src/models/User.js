const mongodb = require('mongoose');

const UserSchema = new mongodb.Schema({
  name:{
    type: String,
    required: true
  },
  stuID:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  admin:{
    type: Boolean,
    default: false
  },
  avatar:{
    type: String,
    required: false
  },
  phone:{
    type: String,
    required: false
  },
  address:{
    type: String,
    required: false
  },
  gender:{
    type: Boolean,
    required: false,
    default: true,
  },
  birth:{
    type: String,
    required: false
  },
  major:{
    type: String,
    required: false
  }
}, {timestamps: true});

module.exports = mongodb.model('User', UserSchema)