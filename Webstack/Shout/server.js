var express = require('express');
var bodyParser = require('body-parser')
var session = require('express-session');
var app = express();
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
//const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var User = require('./userSchema');
var University = require('./uniSchema');
var Post = require('./postSchema');

app.use(bodyParser.json());
app.use(session({
	secret: 'ITWS 4500 Shout',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));

app.use(cors({origin: [
	"http://localhost:4200"
  ], credentials: true}));

const uri = "mongodb+srv://testUser:ITWS4500@cluster0-tpsxu.mongodb.net/test?retryWrites=true";

app.get('/currentUser', function(req,res){
	var sessionInfo = {};
	if(req.session.username){
		sessionInfo.username = req.session.username;
		MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
			if(err) {
				 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
			}
			const collection = client.db("ITWS-4500").collection("University");
			// perform actions on the collection object
			collection.find({univid : req.session.univid}).toArray(function(err, result) {
				sessionInfo.univid = result;
			});
		 });
		 
	}else{
		sessionInfo.username = "Default";
	}
	res.json(sessionInfo);
});

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
	 });

});


app.post('/createAccount', function(req, res){
	//check database for existing user info 
	username = req.body.username;
	nickname = req.body.nickname;
	univ_email=req.body.univ_email;
	univid = req.body.univid;
	hash = bcrypt.hashSync(req.body.password, null);
        
        
		// Store account in database
        MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		if(err) {
			 console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
		}
		console.log('Connected...');
		const collection = client.db("ITWS-4500").collection("User");
            
        collection.find(username).toArray(function(err, result) {
			if (err){
                throw err;
            } 
            
            if (result!= {} ){
                
                //Username already exists, return error to user
				res.json({
					success: false,
					reason: "User already exists"
				});
                
            } else {
                
                // a document instance
                var new_user = new User({ username: username, password: hash, nickname: nickname, email: univ_email, univid: univid });

				// save model to database
				try{
					collection.insertOne(new_user);
				}catch(e){
					console.log(e);
				};

				res.json({
					success: true,
					reason: "User "+ username + " has been created!"
				});
                
            }
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
            
            if (result != {} ){
                
                //Username or password are incorrect, return error to user
                res.json({
					success: false,
					reason: "Username does not exist!"
				});
                
            } else {
				user = result[0];
                //check if password matches
                bcrypt.compare(password, user.password,function(error, result){
                    if(result){
                        //start client session 
						req.session.username = username;
						req.session.univid = user.univid;
                        res.json({
                            success: true,
                            reason: "User "+ username + " has logged in!"
                        });
                    }else{
                        passworderr={
                            success: false,
                            reason: "Incorrect Password!"
                        };
                        res.send(passworderr);
                    }
                });
            }
	 });
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
	 });
});

//returns posts with specific tag and univ id
app.get('/posts', function(req,res){
	tag = req.query.tag;
	univid=req.session.univid;

});


http.listen(3000,() => console.log("Running on port 3000"));