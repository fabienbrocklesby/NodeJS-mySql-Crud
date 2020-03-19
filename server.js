const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fabien2007!',
    database: 'example_crud',
    multipleStatements: true
  });

db.connect((error) => {
    if (error) { 
        console.error('DB connection failed \n Error : ' + JSON.stringify(error));
    } else {
        console.log('DB connection successfull');
    }
});

app.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts', (error, data) => {
        if (error) { 
            console.error(error);
        } else {
            res.render('posts', { posts: data });
        }
    })
});

app.get('/post/view/:id', (req, res) => {
    db.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (error, data) => {
        if (error) { 
            console.error(error); 
        } else {
            res.render('post', { title: data[0].title, content: data[0].content });
        }
    })
});

app.get('/post/add', (req, res) => {
    res.render('add');
});

app.post('/post/add', (req, res) => {
    db.query('INSERT INTO posts SET ?', req.body, function (error) {
        if (error) { 
            console.error(error);
        } else {
            res.redirect('/posts');
        }
    });
});

app.get('/post/update/:id', (req, res) => {
    db.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (error, data) => {
        if (error) { 
            console.error(error);
        } else {
            res.render('update', { title: data[0].title, content: data[0].content });
        }
    })
});

app.post('/post/update/:id', (req, res) => {
    db.query('UPDATE posts SET ? WHERE id = ?', [req.body, req.params.id] , function (error) {
        if (error) { 
            console.error(error);
        } else {
            res.redirect('/posts');
        }
    });
});

app.get('/post/delete/:id', (req, res) => {
    db.query('DELETE FROM posts WHERE id = ?', [req.params.id], (error) => {
        if (error) { 
            console.error(error);
        } else {
            res.redirect('/posts');
        }
    })
});


app.listen(3000, () => console.log('Server is running on port 3000'));