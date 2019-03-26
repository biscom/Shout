var express = require('express');
var app = express();
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://testUser:ITWS4500@cluster0-tpsxu.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
	if(err) {
		 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
	}
	console.log('Connected...');
	const collection = client.db("news-api").collection("articles");
	// perform actions on the collection object
	client.close();
 });

http.listen(3000,() => console.log("Running on port 3000"))