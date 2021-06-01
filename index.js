const express = require('express');
const app = express();
const io = require('socket.io')(app.listen(3000));

app.use(express.urlencoded({extended: false}))
app.use('/static', express.static(__dirname + '/client/static'));
app.use(express.json({type: ['application/json', 'text/plain']}));

app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));