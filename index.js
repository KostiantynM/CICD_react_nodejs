const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('/test', (req,res) => {
  res.send('OK');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
