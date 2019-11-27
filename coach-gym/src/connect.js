const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL = 'SELECT * FROM books';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library',
});

connection.connect(err => {
    if(err)
        return err;
    console.log('Connected!')
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server Status: running');
});

app.get('/books', (req, res) => {
    connection.query(SELECT_ALL, (err, results) => {
        if(err)
            return res.send(err);
        else {
            console.log('Success')
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log("Server listening on port 4000")
})
