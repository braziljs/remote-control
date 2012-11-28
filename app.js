/* Express Config */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = null
  , path = require('path')
  , server = null
  , io = null;

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', routes.index);

/* Socket.io */
server = require('http').createServer(app).listen(app.get('port'));
io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

  /* SYNC */
  socket.on('requestSync', function(key) {
    app.set('token', key);
    console.log('Creating token >>>>> ' + app.get('token'));
    socket.join(app.get('token'));
    socket.broadcast.to(app.get('token')).emit('sync');
    io.sockets.in(app.get('token')).emit('sync');
  });
  
  /* MESSAGE */
  socket.on('message', function(type, data) {
    if(app.get('token')){
        socket.broadcast.to(app.get('token')).emit(data);
    }else{
        socket.broadcast.send(data);
    }
  });

  /*Actions */
  socket.on('next', function(){
    io.sockets.in(app.get('token')).emit('next');
  });
  socket.on('prev', function(){
    io.sockets.in(app.get('token')).emit('prev');
  });
  socket.on('camera', function(){
    io.sockets.in(app.get('token')).emit('camera');
  });
  socket.on('start', function(){
    io.sockets.in(app.get('token')).emit('start');
  });
  
  socket.on('point', function(data){
    io.sockets.in(app.get('token')).emit('point', data);
  });

  socket.on('laserpoint', function(data){
    io.sockets.in(app.get('token')).emit('laserpoint', data);
  });

  socket.on('holofote', function(data){
    io.sockets.in(app.get('token')).emit('holofote', data);
  });
  
});