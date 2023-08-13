var express = require('express');
var router = express.Router();
const Author = require('../models/author');

/* GET home page. */
router.get('/addAuthor', function(req, res, next) {
  const author = new Author();
  res.render('authors/addAuthor', {author: author});
});

router.get('/' ,async function(req,res,next){
  const authors = await Author.find({}).sort({_id: -1});
  res.render('authors/index', {authors})
});
router.get('/:id' ,async function(req,res,next){
  const author = await Author.findById(req.params.id);
  res.render('authors/author', {author})
});

router.post('/', async function(req, res, next){
  const author = new Author(req.body);
  try{
    await author.save();
    res.redirect('/authors')
  } catch {
    res.render('authors/addAuthor', {author:author});
    //return next('error');
  }
});
module.exports = router;
