var express = require('express');
var router = express.Router();

//var readline = require('readline');
//
//url project website
//https://www.npmjs.com/package/googleapis


var google = require('googleapis/lib/googleapis.js');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');

var scopes = [
    'https://mail.google.com',
//    'https://www.googleapis.com/auth/calendar',
//    'https://www.googleapis.com/auth/plus.me'
];

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '70042296713-dbpu3kgl4n60sr16lhs3k7i6r3lc1d3e.apps.googleusercontent.com';
var CLIENT_SECRET = 'lhLBKfYnQszUuJAHvoqIGjEi';
var REDIRECT_URL = 'http://localhost:3000/contact/google/callback';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// code from google gmail
var code;


/* GET contact page. */
router.get('/', function (req, res, next) {
    // res.render('contact', { title: 'Express' });
    //    console.log('cookies');
//    console.log(req.cookies);


    var url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: scopes,

        // Optional property that passes state parameters to redirect URI
        //  state: { foo: 'bar' }
    });
    res.redirect(url);
    console.log("geven url");
    console.log(url);
    res.end();

});

router.get('/google/callback', function (req, res, next) {



    res.render('contact', {title: 'Express'}, function () {
      
        console.log("callback");
        // get param to use get token
        code = req.param("code");

//    
//    
//    var rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//});

        function getAccessToken(oauth2Client, callback) {
            // generate consent page url
//        var url = oauth2Client.generateAuthUrl({
//            access_type: 'offline', // will return a refresh token
//            scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
//        });

//    console.log('Visit the url: ', url);
//    rl.question('Enter the code here:', function (code) {
//        // request access token
//        
//        code1 = code;

            //       console.log("my code " + code);

            oauth2Client.getToken(code, function (err, tokens) {
                if (err) {
                    return callback(err);
                }
                console.log("prawidlowy klucz");
                console.log(tokens);
                // set tokens to the client
                // TODO: tokens should be set by OAuth2 client.
                oauth2Client.setCredentials(tokens);
                console.log(new Date(tokens.expiry_date));
                console.log('sety');
                console.log(oauth2Client);

                callback();
            });

        }

// retrieve an access token
        getAccessToken(oauth2Client, function () {
            // retrieve user profile
            plus.people.get({userId: 'me', auth: oauth2Client}, function (err, profile) {
                if (err) {
                    return console.log('An error occured', err);
                }
                console.log("profile :")
                console.log(profile);
                console.log(profile.displayName, ':', profile.tagline);
            });
        });

//    oauth2Client.getToken(code, function (err, tokens) {
//        // Now tokens contains an access_token and an optional refresh_token. Save them.
//        if (!err) {
//            oauth2Client.setCredentials(tokens);
//            console.log("get token error")
//        } else {
//            console.log("tokens");
//            console.log(tokens);
//        }
//    });


        setTimeout(function () {

            console.log(" refresh tokens :");
            oauth2Client.refreshAccessToken(function (err, tokens) {

                console.log("odswierzam tokeny");

                if (err)
                    console.log(err);
                if (tokens) {
                    console.log(oauth2Client);

                    console.log("tokens :");
                    console.log(tokens);


                    // your access_token is now refreshed and stored in oauth2Client
                    // store these new tokens in a safe place (e.g. database)
                }
            })
        }, 5000);

    });
    
res.render('contact');
});

//router.all('/sendMessage', function (req, res, next) {
//    
//    res.redirect('https://www.googleapis.com/gmail/v1/users/116952278736153950378/messages/send?scope=https://mail.google.com&access_token=ya29.GmBVBNXeXq3MkXFdJN4PmqoOV0_woJyKLopdCbVsgPKxgbKn1IiZoq6oZfSTkZFeafsoYGrzLQMmm_-cX5CKrCq63AuAuw7btwusxcBrTShLBoO6O1npE1B6m_1mLhFk1r8')
//});

//// this libary from website https://www.npmjs.com/package/gmail-send
//
//    console.log('* [example1] sending test email');
//
//// Require the module and set default options 
//// You may use almost any option available in nodemailer,  
//// but if you need fine tuning I'd recommend to consider using nodemailer directly. 
//    var send = require('gmail-send')({
//        user: 'm1jadczak@gmail.com', // Your GMail account used to send emails 
//        pass: 'maja2015', // Application-specific password 
//        to: 'm1jadczak@gmail.com', // Send back to yourself;  
//        // you also may set array of recipients:  
//        // [ 'user1@gmail.com', 'user2@gmail.com' ] 
//        // from:   '"User" <user@gmail.com>'  // from: by default equals to user 
//        // replyTo:'user@gmail.com'           // replyTo: by default undefined 
//        subject: 'test subject',
//        text: 'test text'
//                // html:    '<b>html text text</b>' 
//    });
//
//    var file = './demo-attachment.txt';        // File to attach 
//
//// Override any default option and send email 
//    send({
//        subject: 'attached ' + file, // Override value set as default  
//   //     files: [file]                // String or array of strings of filenames to attach 
//    }, function (err, res) {
//        console.log('* [example1] send(): err:', err, '; res:', res);
//    });


module.exports = router;


// przykład
// https://www.googleapis.com/gmail/v1/users/m1jadczak@gmail.com/messages/15c3fd6622af2a6b?format=raw&scope=https://mail.google.com&access_token=ya29.GmBVBNUFc7a5svHVZgAzWgWd5qqik2yffac95Cz5HldD2xYC3PpQTswO_F-zNDLKmSulURa_CRukgLZzyOh3IFB7RLiJtI8ztVWvHkoiFMLzU8dgU4pRIpXKeP81MVh7wyQ
//https://www.googleapis.com/gmail/v1/users/116952278736153950378/profile?access_token=ya29.GltUBErMpZxwZsdToPBwEJ0sqAd_Zc-uCse0psnuNRPXcXHKUVhjeEmjRG0IJ1AePk0t_p7DR--Wqgkn4WOQWYpV_1ZipXxABru1Ut-l3po2PeEeq11UXt9Qe9Be


