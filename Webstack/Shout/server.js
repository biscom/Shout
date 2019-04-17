var express = require('express');
var session = require('express-session');
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var app = express();

app.use(cors({origin: [
	"http://localhost:4200"
  ], credentials: true}));

app.use(session({secret: "ITWS4500Shout"}));

const uri = "mongodb+srv://testUser:ITWS4500@cluster0-tpsxu.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
	if(err) {
		 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
	}
	console.log('Connected...');
	const collection = client.db("ITWS-4500").collection("posts");
	// perform actions on the collection object
	client.close();
 });

app.get('/nearby', function(req,res){
	lat=req.query.lat;
	lon=req.query.lon;
	//searchdatabase for 3 closest unis and send back in json

});

app.post('/createAccount', function(req, res){
	//check database for existing user info 
	username = req.username;
	nickname = req.nickname;
	univ_email=req.univ_email;
	univid = req.univid;
	bcrypt.hash(req.password, null, function(err, hash) {
		// Store account in database
	});
});

//starts client session or returns false with info about incorrect info
app.post('/login', function(req,res){
	username = res.username;
	password = res.password;
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		if(err) {
			 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
		}
		console.log('Connected...');
		const collection = client.db("ITWS-4500").collection("accounts");
		// get account info 
		//check if user exists


		//check if password matches
		bcrypt.compare(password, db_hash,function(error, result){
			if(result){
				//start client session 
				req.session.username = username;

			}else{
				passworderr={
					valid: false,
					error: "Incorrect Password!"
				};
				res.send(passworderr);
			}
		});

		client.close();
	 });

});

//returns Top posts from everywhere
app.get('/top', function(req,res){
	
});

//returns posts with specific tag and univ id
app.get('/posts', function(req,res){
	tag = req.query.tag;
	univid=req.session.univid;

});


http.listen(3000,() => console.log("Running on port 3000"))