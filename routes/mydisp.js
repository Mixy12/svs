var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('mydisp', { logget: req.session.logged });
});

module.exports = router;
