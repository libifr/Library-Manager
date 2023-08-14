const AWS = require('aws-sdk');
const config = require('./topsecret.js');
const {v1} = require('uuid');

const getBooks = function (req, res) {
    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.book_table
    };

    return new Promise((res, err) => docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
           err ({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res ({
                success: true,
                data: Items
            });
        }
    }));
}


const addBook = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    Item.bookId = v1();
    const params = {
        TableName: config.book_table,
        Item: Item
    };

    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            res.render('books/addBook', {book:data});
        } else {
            res.redirect('/books');
        }
    });
}

module.exports = {
    getBooks,
    addBook,
}