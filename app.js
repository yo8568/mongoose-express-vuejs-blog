var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Post = require('./models/post');

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/kennyblog';
var _db;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));

MongoClient.connect(mongoUrl, function (err, db) {
    if (err) {
        console.error(err);
        return;
    }

    console.log('connected to mongo');
    _db = db;
    app.listen(8888, function () {
        console.log('server is running...');
    });
});

app.all("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});


//get / 首頁 find all
app.get('/find', function (req, res) {
  
  Post.find({}, {"body" : 0},function (err, post) {
    if(err) {
      console.error(err);
      return;
    }
    res.json(post);
    
  });

});
// get /post:id 搜尋文章 by id
app.get('/post/:id', function (req, res) {
    Post.find({ _id: req.params.id }, function (err, post) {
        if (err) return console.error(err);
        res.json(post);
    });
});
// get /create 搜尋文章 
app.get('/create', function (req, res) {
    res.render('create', { title: '新增文章' });
});

// post /create 新增一筆文章 
app.post('/create', function (req, res) {
    console.log('create post');
    var postmodel = new Post();
    postmodel.addPost({
        Title: req.body.Title,
        Author: req.body.Author,
        body: req.body.body
    }, function (err) {
        if (err) return console.error(err);
        
    });

});

// get /delete:id 刪除文章 by id
app.get('/delete/:id', function (req, res) {
    Post.remove({
        _id: req.params.id
    }, function (err) {
        if (err) return console.error(err);
        
    });
});

// get /edit:id 編輯文章 by id
app.get('/edit/:id', function (req, res) {
    Post.find({ _id: req.params.id }, {"Date" : 0}, function (err, post) {
        if (err) return console.error(err);
        res.json(post);
    });

});
//post /edit:id 儲存編輯後文章 by id 
app.post('/edit/:id', function (req, res) {
    var condition = { _id: req.params.id },
   
		      update = { $set: { body: req.body.body, Author: req.body.Author, Title: req.body.Title } },
		      options = { multi: true };
    console.log(update);

    Post.update(condition, update, options, function (err, post) {
        res.send({postpage: 'http://localhost:8080/#!/post/' + req.params.id})
    });
});


