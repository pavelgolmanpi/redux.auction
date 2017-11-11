var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var expressJwt = require('express-jwt');

var bidSchema = mongoose.Schema({
  productId: String,
  value: Number,
  userName: String,
  userUsername: String,
  userId: String
});

bidSchema.plugin(timestamps);

var Bid = mongoose.model('Bid', bidSchema);


router.get('/bids/:productId', function(req, res, next) {
  Bid
    .find({
      productId: req.params.productId
    })
    .select({
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    })
    .limit(100)
    .sort({
      value: -1
    })
    .exec(function(err, bids) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Could not retrieve bids'
        });
      }
      res.json(bids);
    });

});

router.post('/bids', function(req, res, next) {
  var user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'Permission Denied!'
    });
  }
  //else if (!user.isEmailVerified) {
  //  return res.status(401).json({
  //    message: 'Permission Denied! Please verify your email.'
  //  });
  //}

  var body = req.body;
  var productId = body.productId;
  var value = body.value;

  if (!productId || !value) {
    return res.status(400).json({
      message: 'Error productId and value are all required!'
    });
  }

  var bid = new Bid({
    productId: productId,
    value: value,
    userName: req.user.name,
    userUsername: req.user.username,
    userId: req.user._id
  });


  bid.save(function(err, bid) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not save bid'
      });
    }
    res.json(bid);
  });
});

router.delete('/bids/:id', function(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Permission Denied!'
    });
  }

  var id = req.params.id;
  if (id.length != 24) {
    return res.json({
      message: 'id must be a valid 24 char hex string'
    });
  }
  var id = mongoose.Types.ObjectId(req.params.id); //convert to objectid
  Bid.findByIdAndRemove(id, function(err, bid) {
    if (err)
      throw err;

    if (!bid) {
      return res.status(404).json({
        message: 'Could not delete bid'
      });
    }

    res.json({
      result: 'Bid was deleted'
    });

  });
});

router.post('/bids/validate', function(req, res, next) {
  var body = req.body;
  var productId = body.productId;
  var value = body.value;

  Bid.findOne({
    productId: productId,
  }).sort('-value').exec(function(err, bid) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not find bid'
      });
    }
    if (bid && bid.value >= value) {
      res.json({
        value: 'You need place bid with value more than ' + value
      });
    } else {
      return res.json({});
    }

  });
});


module.exports = router;
