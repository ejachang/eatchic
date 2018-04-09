const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../react-client/dist'));


app.post('/post', (req, res) => {

});

app.get('/get', (req, res) => {

});

app.post('/upvote/:dishname', (req, res) => {

});

app.post('/downvote/:dishname',(req, res) => {

});

app.get('/votes',(req, res) => {

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
  