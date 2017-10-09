var express = require('express');
var router = express.Router();
// var db = require('./mongo');

// MONGO DB
// lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = process.env.OPENSHIFT_MONGODB_DB_URL+'itargapp1' || 'mongodb://127.0.0.1:27017/admin_coder';
//console.log("URL is "+url);

// use res.render to load up an ejs view file
router.get('/', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/index.html'));
	res.render('pages/index');	  		
});

/* GET Userlist page. */
router.get('/projects', function(req, res) {  
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db){
		if (err) {
			throw err;
		}
		db.collection('projects').find().toArray(function(err, result) {
			if (err) {
			throw err;
			}
			console.log(result);
			res.send(result);
		});
	});    
});

router.get('/java', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/java.html'));
	res.render('pages/java');
});

router.get('/batch', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/batch.html'));
	res.render('pages/batch');
});

router.get('/solutions', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/solutions.html'));
	res.render('pages/solutions');
});

router.get('/windows', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/windows.html'));
	res.render('pages/windows');
});

router.get('/linux', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/linux.html'));
	res.render('pages/linux');
});

router.get('/windows1', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/rdcMITM.html'));
	res.render('pages/rdcMITM');
});

router.get('/windows2', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/smbEnabled.html'));
	res.render('pages/smbEnabled');
});

router.get('/contact', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/contact.html'));
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db){
		if (err) {
			throw err;
		}
		db.collection('projects').find().toArray(function(err, result) {
			if (err) {
				throw err;
			}
			console.log(result);
			res.render('pages/contact', {items:result});
		});
	});   
});

module.exports = router;
