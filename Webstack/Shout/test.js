var request = require('request');

const url='http://localhost:3000/createAccount';


var accountInfo={
    username : "deahln",
    password : "password",
    nickname : "ndeahl1999",
    univ_email: "deahln@rpi.edu",
    univid : 1
};

request.post({
    url : url,
    json: accountInfo
}), (error, res, body) => {
    if (error) {
      console.error(error)
      return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
  };