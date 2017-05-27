var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Submit a New Application' });
});

router.get('/confirm', function(req, res, next) {
  res.render('confirm', { title: 'Confirm your Application'});
});

router.post('/newApplication', function(req, res, next) {
  models.Applicants.create(req.body.application).then(function(resp) {
    res.status(200).send(resp);
  });
});

router.post('/funnel', function(req, res, next) {
  models.Applicants.findAll({
    where: {
      date: {
        $between: [req.body.startDate, req.body.endDate]
      }
    }
  }).then(function(resp) {
    res.status(200).send(resp);
  })
});

module.exports = router;
