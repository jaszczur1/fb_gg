/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var router = express.Router();

 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('schedule', { title: 'Express' });
    console.log(req.cookies);
    res.end();
});

module.exports = router;

