var express = require('express');
var app = express();
var http = require('http').Server(app);
var session = require('client-sessions');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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

app.post('/createAccount', function(req, res){
	//check database for existing user info 
	bcrypt.hash(res.password, null, function(err, hash) {
		// Store account in database
	});
});

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
		bcrypt.compare(password, db_hash,function(error, result){
			if(res){

			}else{

			}
		});

		client.close();
	 });

});

app.use(session({
	cookieName: 'session',
	secret: 'ITWS4500Shout',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

http.listen(3000,() => console.log("Running on port 3000"))