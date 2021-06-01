const express = require('express');
const app = express();
const io = require('socket.io')(app.listen(3000));

const utils = require('./app/utils')

app.use(express.urlencoded({extended: false}))
app.use('/static', express.static(__dirname + '/client/static'));
app.use(express.json({type: ['application/json', 'text/plain']}));

app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));


let gameCards = [
    [
    {'name': '2C' ,'value': 2, 'img': ''}, 
    {'name': '3C' ,'value': 3, 'img': ''}, 
    {'name': '4C' ,'value': 4, 'img': ''}, 
    {'name': '5C' ,'value': 5, 'img': ''}, 
    {'name': '6C' ,'value': 6, 'img': ''}, 
    {'name': '7C' ,'value': 7, 'img': ''}, 
    {'name': '8C' ,'value': 8, 'img': ''}, 
    {'name': '9C' ,'value': 9, 'img': ''}, 
    {'name': '10C' ,'value': 10, 'img': ''}, 
    {'name': 'QC' ,'value': 10, 'img': ''}, 
    {'name': 'JC' ,'value': 10, 'img': ''}, 
    {'name': 'KC' ,'value': 10, 'img': ''}, 
    {'name': 'AC' ,'value': 11, 'img': ''}    
    ]
]