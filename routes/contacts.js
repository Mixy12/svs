var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('contacts', { logget: req.cookies.logged });
});

module.exports = router;
