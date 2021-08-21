const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:id', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('%s user connected', socket.id);

  socket.on('create', function(room) {
    socket.join(room);
    io.to(room).emit('%s join now!', socket.id);
    console.log('%s user join %s', socket.id, room);
  });

  socket.on('disconnect', () => {
    console.log('%s user disconnected', socket.id);
  });

  socket.on('chat message', (obj) => {
    if(obj) {
      io/*.to(obj.room)*/.emit('chat message', obj.msg);
      console.log(obj.room + obj.msg);
    }
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});