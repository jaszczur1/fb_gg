/**
 * Created by jaszczur on 2017-05-03.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('profile', { title: 'Express' });
});

module.exports = router;
