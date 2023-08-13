const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Author',
        required: true,
    },


});
module.exports = new mongoose.model('Book', bookSchema);