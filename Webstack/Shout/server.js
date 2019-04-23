var express = require('express');
var bodyParser = require('body-parser')
var session = require('express-session');
var app = express();
var http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
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

MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    
    const db = client.db("ITWS-4500");
    console.log("Connected ...")
    
    app.get('/currentUser', function(req,res){
        var sessionInfo = {};
        if(req.session.username){
            sessionInfo.username = req.session.username;

            const collection = db("ITWS-4500").collection("University");

            // perform actions on the collection object
            collection.find({univid : req.session.univid}).toArray(function(err, result) {
                sessionInfo.univid = result;
            });

        } else {
            sessionInfo.username = "Default";
        }
        res.json(sessionInfo);
    });

    app.get('/nearby', function(req,res){
        lat=req.query.lat;
        lon=req.query.lon;

        //searchdatabase for 3 closest unis and send back in json

        const collection = db.collection("University");

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

    app.post('/addPost', function(req, res){
        //check database for existing user info 
        userid = req.session.userid;
        msg_body = req.body.msg_body;
        univid = req.body.univid;

        // Store account in database

        const collection = db.collection("Post");
        
        console.log(req.body.user_id);
        
        // a document instance
        var new_post = new Post({ user_id: userid, msg_body: msg_body, univid: univid });

        // save model to database
        try{
            collection.insertOne(new_post);
        }catch(e){
            console.log(e);
            res.json({
                success: false,
                reason: "Error: " + e
            });
        };

        res.json({
            success: true,
            reason: "Post has been created!"
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

        const collection = db.collection("User");

        collection.find({username:username}).toArray(function(err, result) {
            if (err){
                throw err;
            } 
            if (result[0] != null ){
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
                    res.json({
                        success: true,
                        reason: "Error: " + e
                    });
                };

                res.json({
                    success: true,
                    reason: "User "+ username + " has been created!"
                });
            }
        });
    });

    //starts client session or returns false with info about incorrect info
    app.post('/login', function(req,res){
        username = req.body.username;
        password = req.body.password;
        const collection = db.collection("User");
        // get account info 
        //check if user exists
        collection.find({username : username}).toArray(function(err, result) {
            if (err){
                throw err;
            } 
            if (result == [] ){
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
                        req.session.userid = user._id;
                        
                        uni_collecton = db.collection("University");
                        collection.find(user.univid).toArray(function(err, result) {
                            if (err){
                                throw err;
                            } 
                            
                            req.session.uni_name = result.uni_name;
                        });
                        res.json({
                            success: true,
                            reason: "User "+ username + " has logged in!"
                        });
                    }else{
                        passworderr={
                            success: false,
                            reason: "Incorrect Password!"
                        };
                        res.json(passworderr);
                    }
                });
            }
       });
    });

    //returns Top posts from everywhere
    app.get('/top', function(req,res){
        query = {};
        if(req.query.tag != "all"){
            query.tag = [req.query.tag];
        }
        sortMethod = req.query.sortMethod;

        const collection = db.collection("Post");
        // perform actions on the collection object

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if(sortMethod == "recent"){
                result.sort(function(a,b){
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
            }else if(sortMethod == "popularity"){
                result.sort(function(a,b){
                    aKarma = a.likes - a.dislikes;
                    bKarma = b.likes - b.dislikes;
                    aPop = 0.6 *length(a.comments) + 0.4* aKarma; 
                    bPop = 0.6 *length(b.comments) + 0.4* bKarma;
                    return bPop-aPop; 
                });
            }else if(sortMethod== "score"){
                result.sort(function(a,b){
                    aKarma = a.likes - a.dislikes;
                    bKarma = b.likes - b.dislikes;
                    return bKarma - akarma; 
                });
            }

            res.json(result);
        });
    });
    
    //returns Top posts from everywhere
    app.get('/topUniversity', function(req,res){
        query = {};
        if(req.query.tag != "all"){
            query.tag = [req.query.tag];
        }
        
        query.univid = req.session.univid;
        
        sortMethod = req.query.sortMethod;

        const collection = db.collection("Post");
        // perform actions on the collection object

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if(sortMethod == "recent"){
                result.sort(function(a,b){
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
            }else if(sortMethod == "popularity"){
                result.sort(function(a,b){
                    aKarma = a.likes - a.dislikes;
                    bKarma = b.likes - b.dislikes;
                    aPop = 0.6 *length(a.comments) + 0.4* aKarma; 
                    bPop = 0.6 *length(b.comments) + 0.4* bKarma;
                    return bPop-aPop; 
                });
            }else if(sortMethod== "score"){
                result.sort(function(a,b){
                    aKarma = a.likes - a.dislikes;
                    bKarma = b.likes - b.dislikes;
                    return bKarma - akarma;
                });
            }

            res.json(result);
        });
    });


    app.get('/users', function(req,res){
        const collection = db.collection("User");
        // perform actions on the collection object
        collection.find({}).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    });

    app.get('/profileInfo', function(req,res){
        info={};
        if(req.session.username){
            info.username = req.session.username;
            const collection = db.collection("User");
            // perform actions on the collection object
            collection.find({username: req.session.username}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result[0]);
                info.email = result[0].email;
                res.json(info);			
            });
        } else {
            info.username = "deahln";
            info.email = "deahln@rpi.edu";
            res.json(info);
        }
    });

    //returns posts with specific tag and univ id
    app.get('/posts', function(req,res){
        tag = req.query.tag;
        univid=req.session.univid;

    });
    
    app.post('/updateUsername', function(req,res){
        
        const collection = db.collection("User");
        
        collection.find(req.session.username).toArray(function(err, result) {
            if (err){
                throw err;
            } 

            user = result[0];
            bcrypt.compare(req.body.password, user.password,function(error, result){
                if(result){
                    //store new password session 
                    collection.update({'username':req.session.username},{$set:{'username':req.body.new_username}});
                    res.json({
                        success: true,
                        reason: "Username successfully updated!"

                    });
                }else{
                    passworderr={
                        success: false,
                        reason: "Incorrect Password!"
                    };
                    res.send(passworderr);
                }
            });
        });

    });
    
    app.post('/updatePassword', function(req,res){
        const collection = db.collection("User");
        
        collection.find(req.session.username).toArray(function(err, result) {
            if (err){
                throw err;
            } 

            user = result[0];
            bcrypt.compare(req.body.old_password, user.password,function(error, result){
                if(result){
                    //store new password session 
                    hash = bcrypt.hashSync(req.body.new_password, null);
                    collection.update({'username':req.session.username},{$set:{'password':hash}});
                    res.json({
                        success: true,
                        reason: "Password successfully updated!"

                    });
                }else{
                    passworderr={
                        success: false,
                        reason: "Incorrect Password!"
                    };
                    res.send(passworderr);
                }
            });
        });
    });

    app.get('/checkStatus', function(req,res,){
        var status = {};
        if(req.session.username){
            status.valid = true;
            status.username = req.session.username;
            var collection = db.collection('University');
            collection.find({univid : req.session.univid}).toArray(function(err, result) {
                if (err){
                    throw err;
                } 
                
                status.uni_name = result[0].uni_name;
                res.json(status);
            });        
        }else{
            status.valid = false;
            res.json(status);
        }
    });
    
    app.post('/addComment', function(req,res){
        const collection = db.collection("Post");
        
//        user_id : user_id,
//        msg_body : msg_body,
//        univid : univid
        
        collection.find(req.session.username).toArray(function(err, result) {
            if (err){
                throw err;
            } 

            user = result[0];
            bcrypt.compare(req.body.old_password, user.password,function(error, result){
                if(result){
                    //store new password session 
                    hash = bcrypt.hashSync(req.body.new_password, null);
                    collection.update({'username':req.session.username},{$set:{'password':hash}});
                    res.json({
                        success: true,
                        reason: "Password successfully updated!"

                    });
                }else{
                    passworderr={
                        success: false,
                        reason: "Incorrect Password!"
                    };
                    res.send(passworderr);
                }
            });
        });
    });
    
});

http.listen(3000,() => console.log("Running on port 3000"));