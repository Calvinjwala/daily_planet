var express = require("express"),
app = express(),
bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

var articles = [];
var count = 1;

app.get('/', function(req, res){
  res.render('site/index');
});

app.get('/contact', function(req, res){
  res.render('site/contact');
});

app.get('/about', function(req, res){
  res.render('site/about');
});

app.get('/articles', function(req, res){
  res.render('articles/articles', {name:articles});
});

app.get('/articles/new', function(req, res){
  res.render('articles/new', {name:articles});
});


app.post('/submit', function(req, res){
  // console.log("THIS IS THE REQ OBJECT");
  // console.log(req)
  // console.log("THIS IS MY REQ.QUERY OBJECT");
  // console.log(req.query);
  var article = {};
  article.id = count;
  article.title = req.body.article.title;
  article.body = req.body.article.body;
  articles.push(article);
  console.log([articles]);
  count++;
  res.render('articles/articles', {name:articles});
});

app.get('/articles/article/:id', function(req,res){
  var theTitle = Number(req.params.id);
  var foundArticle;
  articles.forEach(function(article){
    if(article.id === theTitle){
      foundArticle = article;
    }
  });
  res.render('articles/article',{article:foundArticle});
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});