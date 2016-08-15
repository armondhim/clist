var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var List = mongoose.model('List');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contactlist', function(req, res, next) {
  List.find(function(err, contactlist) {
    if(err) {
      return next(err);
    }
    res.json(contactlist);
  });
});

router.post('/contactlist', function(req, res, next) {
  var list = new List(req.body);
  list.save(function(err, contactlist) {
    if(err) {
      return next(err);
    }
    res.json(contactlist);
  });
});

router.param('contactlist', function(req, res, next, id) {
  var query = List.findById(id);
  query.exec(function(err, contactlist) {
    if(err) {
      return next(err);
    }
    if(!contactlist) {
      return next(new Error("cant find a list"));
    }
    req.contactlist = contactlist;
    return next();
  });
});

router.delete('/contactlist/:id', function(req, res) {
  List.remove({_id : req.params.id}, function(err, contactlist) {
    if(err) {
      return next(err);
    }
    res.json(contactlist);
  });
});

router.get('/contactlist/:id', function(req, res, next) {
  List.find({_id : req.params.id}, function(err, doc) {
    if(err) {
      return next(err);
    }
    res.json(doc);
  });
});

module.exports = router;
