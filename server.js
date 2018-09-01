const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(`${__dirname}/dist`));

// send the user to index html page inspite of the url
app.get('/api/:file', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/api`, req.params.file)) ;
});

app.get('/assets/:file', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist/assets`, req.params.file)) ;
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist`, 'index.html'));
});

app.listen(port);