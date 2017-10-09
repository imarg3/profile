var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({  
  name: String,
  email: { type: String, index: { unique: true } },
  // dob: { type: Date, default: Date.now },
  password: String
},
{
	collection: 'users'
});

// Mongoose Model definition
mongoose.model('User', userSchema);