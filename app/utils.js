module.exports = {
    cardsCount: (arr) => {
        let count = 0;
        if (Array.isArray(arr[0])) {
            for (i in arr) count += arr[i].length    
        } else count = arr.length;    
        return count;
    },
    randomNumber: (max) => {
        min = Math.ceil(0);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }, 
    getCard: function(cards) {
        const deckNumber = this.randomNumber(cards.length)
        const cardNumber = this.randomNumber(cards[deckNumber].length)
        card = cards[deckNumber].splice(cardNumber, 1)
        return {
            card,
            cards
        }
    }
}