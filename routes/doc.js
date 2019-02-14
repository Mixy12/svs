var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/requisites', function(req, res, next) {

  res.render('requisites', { logget: req.session.logged });
});

router.get('/contract', function(req, res, next) {

  res.render('contract', { logget: req.session.logged });
});

router.get('/reglament', function(req, res, next) {

  res.render('reglament', { logget: req.session.logged });
});

module.exports = router;
