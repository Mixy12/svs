var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {


  res.cookie('plushka', 'kolotushka');

  console.log('Cookies: ', req.cookies);

  res.render('testcoocie', { logget: req.cookies.logged });
});

module.exports = router;
