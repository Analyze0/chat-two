const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
