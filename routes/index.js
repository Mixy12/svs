var express = require('express');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.query.logout == 'true'){
    res.cookie('logged', false);
    res.cookie('userId', '');
    res.cookie('hash', '');
    res.cookie('alias', '');
    res.render('index', { logget: false });
  }
   res.render('index', { logget: req.cookies.logged });
});

module.exports = router;
