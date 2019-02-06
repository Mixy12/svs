var express = require('express');
var router = express.Router();

const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
var data;

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.logged == true) {
        res.render('requestdelivery',{
            logget: req.session.logged
        });
    }else{
        res.render('login',{
            logget: req.session.logged
        });
    }
        });

module.exports = router;
