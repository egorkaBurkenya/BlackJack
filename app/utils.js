module.exports.Utiles = {
    cardsCount: arr => {
        let count = 0;
        if (Array.isArray(arr[0])) {
            for (i in arr) count += arr[i].length;
        } else count = arr.length;
        return count;
    },
    randomNumber: max => {
        let min = Math.ceil(0);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }, 
    getCard: function(deck) {
        const deckNumber = this.randomNumber(deck.length);
        const cardNumber = this.randomNumber(deck[deckNumber].length);
        card = deck[deckNumber].splice(cardNumber, 1)[0];
        return {
            card,
            spliceDeck: deck
        }
    },
    gamerCardsCount: (arr, isHiddenCard) => {
        let count = 0;
        if (isHiddenCard) arr.splice(0, 1);
        for (key in arr) {            
            if (arr[key].name != 'AC') {
                count += arr[key].value;
            }    
        };
        if (arr.includes({'name': 'AC' ,'value': 11})) {
            if (count + 11 > 21) count += 1;
            else count += 11;
        }
        return count
    }
}