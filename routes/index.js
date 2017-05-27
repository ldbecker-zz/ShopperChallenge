var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/confirm', function(req, res, next) {
  res.render('confirm', { title: 'Confirm'});
});

router.post('/newApplication', function(req, res, next) {

});

module.exports = router;
