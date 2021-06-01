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
    gamerCardsCount: (give_arr, isHiddenCard) => {
        let count = 0;
        let arr = [];
        let a = {name: ''};

        give_arr.forEach(card => arr.push(card))

        if (isHiddenCard) arr.splice(0, 1)
        

        arr.forEach(card => {
            if (card.name.includes('A')) {
                a = card
            } else {
                console.log(card);
                count += card.value
            }
        })
        if (a.name.includes('A')) {
            if ((count + 11) > 21) count += 1 
            else count += 11
        }
        return count
    }
}