var express = require('express');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  console.log(sess);
  if(req.query.logout == 'true'){
    req.session.logged = false;
    req.session.userId = '';
    req.session.hash = '';
    req.session.alias = '';
  }
  res.render('index', { logget: req.session.logged });
});

module.exports = router;
