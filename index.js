var app = require('./app/config/server');
var indexRouter = require('./app/routes/index');

app.use('/', indexRouter);

app.listen(3000, '127.0.0.1', function(req, res) {
  console.log('Listening on 3000');
});