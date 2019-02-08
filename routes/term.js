var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
const urlencodedParser = bodyParser.urlencoded({extended: false});


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('term', { logget: req.session.logged});

});

module.exports = router;
