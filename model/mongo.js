var mongoose = require('mongoose');
var dbUrl = process.env.OPENSHIFT_MONGODB_DB_URL+'itargapp1';
mongoose.connect(dbUrl);
 
console.log("Connected to Mongo Database !!!")
