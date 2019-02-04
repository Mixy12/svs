var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  console.log(sess);
  if(req.session.logged == true){
    menu = 'Кабинет';
  }else{
    menu = 'Вход';
  }
  res.render('index', { menu: menu });
});

module.exports = router;
