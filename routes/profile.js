/**
 * Created by jaszczur on 2017-05-03.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('profile', {title: 'Express', appId: 103744583532463});
    res.end();

});


// POST for prafile facebook
router.get('/cookie', function (req, res, next) {
    console.log('cookie');

    res.cookie('profie', req.query.name);
    res.end();
});
module.exports = router;
