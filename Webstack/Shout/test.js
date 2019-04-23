var request = require('request');

//const url='http://localhost:3000/createAccount';
//
//
//var accountInfo={
//    username : "deahln2",
//    password : "password",
//    nickname : "ndeahl1999",
//    univ_email: "deahln@rpi.edu",
//    univid : 1
//};

const url='http://localhost:3000/addPost';

var postInfo={
      user_id : 1,
      msg_body : "test",
      univid : 1
    };

request.post({
    url : url,
    json: postInfo
}), (error, res, body) => {
    if (error) {
      console.error(error)
      return
    }
    console.log(res);
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
  };