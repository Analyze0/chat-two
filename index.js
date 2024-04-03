const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send a message when a user connects
  io.emit('chat message', "<span style='color:#D37676'> - A user has connected.</span>");

  socket.on('chat message', (msg) => {
    console.log('Message:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');

    // Send a message when a user disconnects
    io.emit('chat message', "<span style='color:#FF8080'> - A user has disconnected.</span>");
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// Vercel compatibility
app.use((req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
