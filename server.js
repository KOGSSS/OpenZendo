const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('enter', (data) => {
    console.log(`User entered at ${data.time}`);
    io.emit('user-entered', data);
  });

  socket.on('exit', (data) => {
    console.log(`User exited at ${data.time}, duration: ${data.duration} minutes`);
    io.emit('user-exited', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
