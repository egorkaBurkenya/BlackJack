const express = require('express');
const app = express();
const io = require('socket.io')(app.listen(3000));
const utils = require('./app/utils')

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

// let gameCards;
let gamers = {
    "dealer": {
        "cards": []
    }
};

app.use(express.urlencoded({extended: false}))
app.use('/static', express.static(__dirname + '/client/static'));
app.use(express.json({type: ['application/json', 'text/plain']}));

app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));

io.sockets.on('connection', socket => {
    gamers[socket.id] = {
        "cards": []
    }
    // gameCards = cards
    //(gamers);
    //('Connected ✅') 

    // socket.on('start', () => {
    //     gameCards = cards
    //     const count = utils.cardsCount(cards)
    //     socket.emit('cardsCount', {
    //         "count": count
    //     })
    // });
    socket.on('start', () => {
        let answer = utils.getCard(gameCards)
        gameCards = answer.cards
        card1 = answer.card
        gamers[socket.id].cards.push(card1)

        answer = utils.getCard(gameCards)
        gameCards = answer.cards
        card2 = answer.card
        gamers[socket.id].cards.push(card2)

        socket.emit('UserCards', {
            card1, card2, count: utils.cardsCount(gameCards)
        })
        //(gameCards);
    })
    
    socket.on('dealerStart', () => {
        let answer = utils.getCard(gameCards)
        gameCards = answer.cards
        card1 = answer.card
        gamers["dealer"].cards.push(card1)

        answer = utils.getCard(gameCards)
        gameCards = answer.cards
        card2 = answer.card
        gamers["dealer"].cards.push(card2)

        socket.emit('dealerCards', {
            card2, count: utils.cardsCount(gameCards)
        })
        //(gamers);
    })

    socket.on('hit', () => {
        let answer = utils.getCard(gameCards)
        gameCards = answer.cards
        socket.emit('hitedCard', 
        {card: answer.card, count: utils.cardsCount(gameCards)})
    })

    socket.on('stay', () => {
        let dealerCount = 0;
        for (i in gamers.dealer.cards){
            if (gamers.dealer.cards[i] != gamers.dealer.cards[0]) {
                dealerCount += gamers.dealer.cards[i][0].value
            }
        }
        if (dealerCount < 16) {
            let answer = utils.getCard(gameCards)
            gameCards = answer.cards
            gamers["dealer"].cards.push(answer.card)
            socket.emit('hitedDealerCard', 
            {card: answer.card, count: utils.cardsCount(gameCards)})
        } else {
            socket.emit('DealerStop', gamers.dealer.cards[0][0])
        }
    });

    socket.on('restart', () => {
        gamers = {
            "dealer": {
                "cards": []
            }
        };
        gamers[socket.id] = {
            "cards": []
        }
        gameCards = [
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
    })
        
});