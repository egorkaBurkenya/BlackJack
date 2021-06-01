const express = require('express');
const app = express();
const io = require('socket.io')(app.listen(3000));


const { Utiles } = require('./app/utils');


app.use(express.urlencoded({extended: false}));
app.use('/static', express.static(__dirname + '/client/static'));
app.use(express.json({type: ['application/json', 'text/plain']}));

app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));

let deck = [
    [
    {'name': '2C' ,'value': 2}, 
    {'name': '3C' ,'value': 3}, 
    {'name': '4C' ,'value': 4}, 
    {'name': '5C' ,'value': 5}, 
    {'name': '6C' ,'value': 6}, 
    {'name': '7C' ,'value': 7}, 
    {'name': '8C' ,'value': 8}, 
    {'name': '9C' ,'value': 9}, 
    {'name': '10C' ,'value': 10}, 
    {'name': 'QC' ,'value': 10}, 
    {'name': 'JC' ,'value': 10}, 
    {'name': 'KC' ,'value': 10}, 
    {'name': 'AC' ,'value': 11}    
    ]
];

io.sockets.on('connection', socket => {
    
    
    const gamersCards = {
        dealer: [],
    };
    gamersCards[socket.id] = [];

    socket.on('restart', () => {
        deck = [
            [
            {'name': '2C' ,'value': 2}, 
            {'name': '3C' ,'value': 3}, 
            {'name': '4C' ,'value': 4}, 
            {'name': '5C' ,'value': 5}, 
            {'name': '6C' ,'value': 6}, 
            {'name': '7C' ,'value': 7}, 
            {'name': '8C' ,'value': 8}, 
            {'name': '9C' ,'value': 9}, 
            {'name': '10C' ,'value': 10}, 
            {'name': 'QC' ,'value': 10}, 
            {'name': 'JC' ,'value': 10}, 
            {'name': 'KC' ,'value': 10}, 
            {'name': 'AC' ,'value': 11}    
            ]
        ]; 
    })
    
    /*
     * Получение кол-во кард в колоде !
    */ 
    socket.on('lemmy cards, bruh', () => {
        let cardsCount = Utiles.cardsCount(deck);
        socket.emit('cards count', cardsCount);
    });

    /* 
    * Отдает одну карту 
    * isUser:
        * если true: отдает карту пользовтелю
        * если false: отдает карту дилеру   
    
    */
    socket.on('lemmy only one card, bruh', isUser => {

        const {card, spliceDeck} = Utiles.getCard(deck);
        deck = spliceDeck;

        if ( isUser ) {
            gamersCards[socket.id].push(card);
            socket.emit('card for user, bruh', card);
        } else {

            gamersCards.dealer.push(card);

            if (gamersCards.dealer.length > 1) {
                socket.emit('card for dealer, bruh', card);
            } else {
                socket.emit('card for dealer, bruh', {name: 'green_back', value: 0});
            }
        }
        })
    
    /* 
    * Отдает кол-во очков пользоватлея:
    * isUser:
        * если true: отдает очки пользовтелю
        * если false: отдает очки дилеру  
    */
    socket.on('lemmy gamers cards count, bruh', isUser => {
        if (isUser) {
            const cardCount = Utiles.gamerCardsCount(gamersCards[socket.id], false);
            socket.emit('user cards count, bruh', cardCount);
        } else {
            const cardCount = Utiles.gamerCardsCount(gamersCards.dealer, true);
            socket.emit('dealer cards count, bruh', cardCount);
        }
    })

    socket.on('open card', () => {
        const cardCount = Utiles.gamerCardsCount(gamersCards.dealer, false);
        socket.emit('dealer open card, bruh', {cardCount, card: gamersCards.dealer[0]});
    })

    })
