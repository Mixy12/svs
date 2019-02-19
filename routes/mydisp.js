var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.logged == 'true') {
    res.render('mydisp',{
      logget: req.cookies.logged
    });
  }else{
    res.render('login',{
      logget: req.cookies.logged
    });
  }
});

module.exports = router;
