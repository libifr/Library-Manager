const mongoose = require('mongoose');
const Book = require('./book');
const Author = require('./author');

async function main(){
    await mongoose.connect("mongodb://localhost/myBooks",{useNewUrlParser: true});

    let vladimir, scott, marcel;
    [vladimir, scott, marcel] = await Author.insertMany([
        {firstName: 'Vladimir', lastName: 'Nabokov'},
        {firstName: 'F. Scott', lastName: 'Fitzgerald'},
        {firstName: 'Marcel', lastName: 'Proust'},

    ]);
    await Book.insertMany([
        {bookName:'Lolita' , isbn:'1001' , author: vladimir._id},
        {bookName:'The Great Gatsby' , isbn:'1002' , author: scott._id},
        {bookName:'In Search of Lost Time' , isbn:'1003' , author: marcel._id},
    ]);
    await mongoose.disconnect();
}

main().then(r => r).catch(e => console.log(`Error!: ${e}`));