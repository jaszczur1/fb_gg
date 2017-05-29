    var express = require('express');
var router = express.Router();

module.exports = router;

var gmailNode = require('gmail-node');
var fs = require('fs');

// Load client secrets from a local file.
fs.readFile('client_secret.json', function(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  console.log(JSON.parse(content));
  
  gmailNode.init(JSON.parse(content), './token.json', function(err,data){ 
  
 // if(err) console.log("error: "+err);
        if(data) console.log("data :"+data);
  
  });
  
  var emailMessage = {
    to: 'm1jadczak@gmail.com',
    subject: 'Test Subject',
    message: 'Test Email'
};
 gmailNode.send(emailMessage, function (err, data) {
 console.log(data);
 });
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
 //setTimeout( function (){gmailNode.clearToken()},"3000");
  
});