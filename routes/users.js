var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //parses information from POST
// var db = require('./mongo');

router.get('/registration', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/index.html'));
	res.render('pages/registration');
});

router.get('/login', function(req,res){
	// res.sendFile(path.join(__dirname + '/html/' + '/login.html'));
	res.render('pages/login', {message: "null"});
});

//======================USER VALIDATION CHECK ===============
function checkAuth(req, res, next) {
  var session = req.session;
  console.log(session);
  if (typeof session === "undefined") {
    res.render('pages/error', {message: 'You are not authorized to view this page'});
  } else {
    next();
  }
}

//===============WELCOME PAGE======================
// router.get('/dashboard', checkAuth, function (req, res) {
router.get('/dashboard', function (req, res) {
  res.render('pages/dashboard');
});

//==================REGISTRATION ROUTE===============
router.post('/registration', function (req, res) {
	/*
	// MONGO DB
// lets require/import the mongodb native drivers.
 mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://127.0.0.1:27017/admin_coder';

  var post = req.body;
  if (typeof post.name === undefined && typeof post.email === undefined && typeof post.password === undefined) {
    res.send('Bad user/pass');	
  } else {	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db){
		if (err) {
			throw err;
		}
		var name = post.name;		
		var email = post.email;
		var password = post.password;
		console.log(name + ' ' + email + ' ' + password)
		var jsonDocument = {name: name, email: email, password: password};

		// Insert Record in MongoDB
		db.collection('users').insert(jsonDocument, function(err, records) {
			if (err) {
				throw err;
			}
			console.log(records);
			// console.log("Record added as "+records[0]._id);
			res.render('pages/login', {message:"You are successfully registered. We have sent you an email along with the activation "
				+" link. Please click on the link to activate your account and Login with your provided credentials."});
		});
	});        
  }
  */

  // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        
        //call the create function for our database
        mongoose.model('User').create({
            name : name,
            email : email,
            password : password,
            
        }, function (err, user) {
              if (err) {
                  res.render('pages/error', {message: "There was a problem adding the information to the database."});
              } else {
                  //User has been created
                  console.log('POST creating new user: ' + user);
                  /*
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("users");
                        // And forward to success page
                        res.redirect("/pages/success");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(user);
                    }
                   });
                   */
                   res.render('pages/login', {message:"You are successfully registered. We have sent you an email along with the activation "
				+" link. Please click on the link to activate your account and Login with your provided credentials.", status: true});
              }
        });
});

//==================LOGIN ROUTE===============
router.post('/login', function (req, res) {
	/*
var post = req.body;
  if (typeof post.name === undefined && typeof post.email === undefined && typeof post.password === undefined) {
    res.send('Bad user/pass');	
  } else {
  // Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db){
		if (err) {
			throw err;
		}
		
		var email = post.email;
		var password = post.password;				

		// Insert Record in MongoDB
		db.collection('users').find({"email":email, "password":password}, function(err, records) {
			if (err) {
				throw err;
			}
			console.log(records);
			// console.log("Record added as "+records[0]._id);
			res.render('pages/java', {message:"You are successfully registered. We have sent you an email along with the activation "
				+" link. Please click on the link to activate your account and Login with your provided credentials."});
		});
	});
	*/
  /*
  if (post.user === 'john' && post.password === 'johnspassword') {
    req.session.user_id = johns_user_id_here;
    res.redirect('/my_secret_page');
  } else {
    res.send('Bad user/pass');
  }
  /*
 }*/

 // Alternate Way usign Mongoose
 // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms        
        var email = req.body.email;
        var password = req.body.password;
        // console.log(email + " " + password);
        //call the create function for our database
        mongoose.model('User').findOne({            
            email : email,
            password : password            
        }, function (err, user) {
              if (err) {
              	res.render('pages/error', {message: "There was a problem adding the information to the database."});                  
              } else {
                  //User has been created
                  console.log('AUTH new user: ' + user);
                  // console.log(typeof user);
                  /*
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("users");
                        // And forward to success page
                        res.redirect("/pages/success");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(user);
                    }
                   });
                   */
                   if(user === null){
                   	res.render('pages/login', {message: "Invalid Credentials Provided.", status: false});
                   }else{
                   	 // req.session.email = email;
    				 // res.redirect('pages/dashboard');                   	             ;
    				 // res.render() will render the view with data passed to it, 
    				 // res.redirect() will redirect a user to another page (at which point the request starts over)
    				 res.render('pages/dashboard', {username: email});
                   }
              }
        });

});

//===================LOGOUT ROUTE===========
router.get('/logout', function (req, res) {
  // delete req.session.user_id;
  res.redirect('/users/login');
});  

module.exports = router;
