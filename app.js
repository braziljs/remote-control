var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , hash = false;

app.listen(81);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  
  socket.on('message', function(type, data) {
      
      if(hash){
          socket.broadcast.to(hash).emit(data);
      }else{
          socket.broadcast.send(data);
      }
      
  });
  
  socket.on('next', function(){
      io.sockets.in(hash).emit('next');
  });
  socket.on('prev', function(){
      io.sockets.in(hash).emit('prev');
  });
  socket.on('camera', function(){
      io.sockets.in(hash).emit('camera');
  });
  socket.on('start', function(){
      io.sockets.in(hash).emit('start');
  });
  
  socket.on('point', function(data){
      io.sockets.in(hash).emit('point', data);
  });

  socket.on('laserpoint', function(data){
    io.sockets.in(hash).emit('laserpoint', data);
  });

  socket.on('holofote', function(data){
    io.sockets.in(hash).emit('holofote', data);
  });
  
  socket.on('requestSync', function(key) {
      socket.join(key);
      hash= key;
      socket.broadcast.to(hash).emit('sync');
      io.sockets.in(hash).emit('sync');
  });
  
});