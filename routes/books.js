var express = require('express');
var router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');

/* GET home page. */
router.get('/addBook',async function(req, res, next) {
  //res.render('index', { title: 'Express' });
  const authors = await Author.find({}).sort({_id: -1});
  const book = new Book();
  res.render('books/addBook', {book: book, authors: authors});
});

router.get('/' ,async function(req,res,next){
  const books = await Book.find({}).sort({_id: -1}).populate("author");
  res.render('books/index', {books})
});
router.get('/:id' ,async function(req,res,next){
  const book = await Book.findById(req.params.id).populate("author");
 // const author = await Author.findById(book.author);
  res.render('books/book', {book:book, author:book.author});
});
router.post('/', async function(req, res, next){
  //const book = new Book(req.body);
  const author = await Author.findById(req.body.author);
  req.body.author = author;
  const book = new Book(req.body);
  try{
    await book.save();
   res.redirect('/books');
    //res.next('/');
  } catch {
    res.render('books/addBook', {book:book});
  }
});
module.exports = router;
