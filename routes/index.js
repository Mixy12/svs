var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  console.log(sess);
  res.render('index', { title: 'Phoenix' });
});

module.exports = router;
