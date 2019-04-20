var express = require('express');
var session = require('express-session');
var app = express();
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var User = require('./userSchema');
var University = require('./uniSchema');
var Post = require('./postSchema');


app.use(session({
	secret: 'ITWS 4500 Shout',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))

app.use(cors({origin: [
	"http://localhost:4200"
  ], credentials: true}));

const uri = "mongodb+srv://testUser:ITWS4500@cluster0-tpsxu.mongodb.net/test?retryWrites=true";

app.get('/nearby', function(req,res){
	lat=req.query.lat;
	lon=req.query.lon;
	//searchdatabase for 3 closest unis and send back in json
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		if(err) {
			 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
		}
		const collection = client.db("ITWS-4500").collection("University");
		// perform actions on the collection object
		collection.find({}).toArray(function(err, result) {
			if (err) throw err;
			result.sort(function(a,b){
				alat = a.location.lat;
				alon = a.location.lon;
				blat = b.location.lat;
				blon = b.location.lon;
				abDist = function(c,d){
					return Math.abs(c - d);
				};
				aDist= abDist(lat, alat) + abDist(lon, alon);
				bDist = abDist(lat, blat)+ abDist(lon,blon);
				return aDist - bDist
			});
			res.json(result.slice(0,5));
		});
		client.close();
	 });

});


app.post('/createAccount', function(req, res){
	//check database for existing user info 
	username = req.body.username;
	nickname = req.body.nickname;
	univ_email=req.body.univ_email;
	univid = req.body.univid;
	bcrypt.hash(req.body.password, null, function(err, hash) {
        if (err){
            console.log('Error occurred while hashing the user password...\n',err);
        }
        
		// Store account in database
        MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		if(err) {
			 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
		}
		console.log('Connected...');
		const collection = client.db("ITWS-4500").collection("user");
            
        collection.find(username).toArray(function(err, result) {
			if (err){
                throw err;
            } 
            
            if (result == {}){
                
                //Username already exists, return error to user
                console.log("USER EXISTS");
                
            } else {
                
                // a document instance
                var new_user = new User({ username: username, password: hash, nickname: nickname, email: univ_email, univid: univid });

                // save model to database
                collection.save(function (err, new_user) {
                    if (err) {
                      return console.error(err);
                    } else {
                      console.log(new_user.username + " saved to user collection.");
                    }
                });
                
            }
		  });
            
        client.close();
        
        });
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
		const collection = client.db("ITWS-4500").collection("user");
		// get account info 
		//check if user exists
        collection.find(username).toArray(function(err, result) {
			if (err){
                throw err;
            } 
            
            if (result == {}){
                
                //Username already exists, return error to user
                console.log("USER EXISTS");
                
            } else {


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
	query = {};
	if(req.query.tag != "all"){
		query.tag = [req.query.tag];
	}
	sortMethod = req.query.sortMethod;
	console.log(query);

	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		if(err) {
			 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
		}
		console.log('Connected...');
		const collection = client.db("ITWS-4500").collection("Post");
		// perform actions on the collection object
			
		collection.find(query).toArray(function(err, result) {
			if (err) throw err;
			if(sortMethod == "recent"){
				result.sort(function(a,b){
					return new Date(b.timestamp) - new Date(a.timestamp);
				});
				console.log(result);
			}else if(sortMethod == "popularity"){
				
			}else if(sortMethod== "score"){
				result.sort(function(a,b){
					aKarma = length(a.likes) - length(a.dislikes);
					bKarma = length(b.likes) - length(b.dislikes);
					return aKarma - bkarma;
				});
			}
			
			res.json(result);
		});
		client.close();
	 });
});

app.get('/users', function(req,res){
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		if(err) {
			 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
		}
		const collection = client.db("ITWS-4500").collection("User");
		// perform actions on the collection object
		collection.find({}).toArray(function(err, result) {
			if (err) throw err;
			res.json(result);
		});
		client.close();
	 });
});

//returns posts with specific tag and univ id
app.get('/posts', function(req,res){
	tag = req.query.tag;
	univid=req.session.univid;

});


http.listen(3000,() => console.log("Running on port 3000"))