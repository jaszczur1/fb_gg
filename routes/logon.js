/**
 * Created by jaszczur on 2017-04-27.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {

    res.render('logon')
   console.log(req.param);

});

module.exports = router;