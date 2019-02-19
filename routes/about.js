var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  res.render('about', { logget: req.cookies.logged });
});

module.exports = router;
