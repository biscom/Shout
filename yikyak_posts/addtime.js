var Chance = require('chance');
var chance = new Chance();
const fs = require('fs');

file = 'buzz2.json'

let rawdata = fs.readFileSync(file);  
let json = JSON.parse(rawdata);  
console.log(json);
// for (i = 0; i < json.length; i++) {
// 	date = chance.date({year: 2019});
// 	json[i].timestamp = date;
// }

fs.writeFileSync(file, JSON.stringify(json));

