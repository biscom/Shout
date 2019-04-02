var express = require('express');
var app = express();
var http = require('http').Server(app);
var session = require('client-sessions');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')

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

app.post('/login', function(req, res){
	
});

app.use(session({
	cookieName: 'session',
	secret: 'ITWS4500Shout',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

http.listen(3000,() => console.log("Running on port 3000"))