var mongoose = require('mongoose');
var dbUrl = process.env.OPENSHIFT_MONGODB_DB_URL+'admin_coder';
mongoose.connect(dbUrl);
 
console.log("Connected to Mongo Database !!!")
