// mongoose is an object modeling package for Node like ORM
var mongoose = require('mongoose');
var dbUrl = process.env.OPENSHIFT_MONGODB_DB_URL+'itargapp1' || 'mongodb://127.0.0.1/admin_coder';
console.log(dbUrl);

var connection = mongoose.createConnection(dbUrl);
connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', function () {
	console.info('connected to database')
  });
// mongoose.connect('mongodb://localhost/admin_coder');
