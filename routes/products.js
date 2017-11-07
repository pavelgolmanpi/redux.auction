var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var expressJwt = require('express-jwt');


var productSchema = mongoose.Schema({
  title: String,
  categories: [String],
  content: String,
  authorName: String,
  authorUsername: String,
  authorId: String
});

productSchema.plugin(timestamps);

var Product = mongoose.model('Product', productSchema);



router.get('/products', function(req, res, next) {
  Product
    .find({})
    .select({
      content: 0,
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    })
    .limit(100)
    .sort({
      createdAt: -1
    })
    .exec(function(err, products) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Could not retrieve products'
        });
      }
      res.json(products);
    });

});

router.post('/products', function(req, res, next) {
  var user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'Permission Denied!'
    });
  } else if (!user.isEmailVerified) {
    return res.status(401).json({
      message: 'Permission Denied! Please verify your email.'
    });
  }

  console.dir(req.user);

  var body = req.body;
  var title = body.title;
  var categories = body.categories;
  var content = body.content;

  //simulate error if title, categories and content are all "test"
  //This is demo field-validation error upon submission.
  if (title === 'test' && categories === 'test' && content === 'test') {
    return res.status(403).json({
      message: {
        title: 'Title Error - Cant use "test" in all fields!',
        categories: 'Categories Error',
        content: 'Content Error',
        submitmessage: 'Final Error near the submit button!'
      }
    });
  }

  if (!title || !categories || !content) {
    return res.status(400).json({
      message: 'Error title, categories and content are all required!'
    });
  }

  var product = new Product({
    title: title,
    categories: categories.split(','),
    content: content,
    authorName: req.user.name,
    authorUsername: req.user.username,
    authorId: req.user._id,
    authorImage: req.user.image
  });


  product.save(function(err, product) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not save product'
      });
    }
    res.json(product);
  });
});

router.get('/products/:id', function(req, res, next) {
  Product.findById({
    '_id': req.params.id
  }, function(err, product) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not retrieve product w/ that id'
      });
    }
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }
    res.json(product);
  });
});

router.delete('/products/:id', function(req, res, next) {
  if (!req.user || !req.user.isEmailVerified) {
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
  Product.findByIdAndRemove(id, function(err, product) {
    if (err)
      throw err;

    if (!product) {
      return res.status(404).json({
        message: 'Could not delete product'
      });
    }

    res.json({
      result: 'Product was deleted'
    });

  });
});

router.post('/products/validate/fields', function(req, res, next) {
  var body = req.body;
  var title = body.title ? body.title.trim() : '';

  Product.findOne({
    'title': new RegExp(title, "i")
  }, function(err, product) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not find product for title uniqueness'
      });
    }
    if (product) {
      res.json({
        title: 'Title "' + title + '" is not unique!'
      });
    } else {
      return res.json({});
    }

  });
});


module.exports = router;
