var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logged === true) {
    res.render('mydisp',{
      logget: req.session.logged
    });
  }else{
    res.render('login',{
      logget: req.session.logged
    });
  }
});

module.exports = router;
