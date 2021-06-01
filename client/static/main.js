const socket = io()

const dealerHand = document.querySelector('.dealer-hand')
const yourHand = document.querySelector('.your-hand')
const info = document.querySelector('.info')
const start = document.querySelector('.start')
const hit = document.querySelector('.hit')
const stay = document.querySelector('.stay')
const pannel = document.querySelector('.pannel')
const total = document.querySelector('.total')
const dealerTotal = document.querySelector('.d-total')
const yourTotal = document.querySelector('.y-total')
const restart = document.querySelector('.restart')

// * EventListeners

start.addEventListener('click', e => {
  start.classList.add('hidden')
  hit.classList.remove('hidden')
  stay.classList.remove('hidden')

  socket.emit('lemmy only one card, bruh', true)
  socket.emit('lemmy only one card, bruh', true)
  socket.emit('lemmy only one card, bruh', false)
  socket.emit('lemmy only one card, bruh', false)
  socket.emit('lemmy cards, bruh')  
})

hit.addEventListener('click', e => {
  socket.emit('lemmy only one card, bruh', true)
})

stay.addEventListener('click', e => {
  stay.classList.add('hidden')
  hit.classList.add('hidden')
  restart.classList.remove('hidden')
  // pannel.innerHTML = `<button class="restart">Restart Game</button>`
  if(dealerTotal.innerText < 16) {
    socket.emit('lemmy only one card, bruh', false)
  }
})

restart.addEventListener('click', e => {
  socket.emit('restart')
  window.location.reload()
})

// * functions

const displayYourCard = name => {
  yourHand.innerHTML += `<img class="card" src="./static/PNG/${name}.png"/>`
}
const displayDealerCard = name => {
  dealerHand.innerHTML += `<img class="card" src="./static/PNG/${name}.png"/>`
}
const addInfo = text => {
  info.innerHTML += `<p>${text}</p>`
}

// * socken.on

socket.on('cards count', cardsCount => {
  total.innerText = cardsCount
})

socket.on('card for user, bruh', card => {
  displayYourCard(card.name)
  socket.emit('lemmy gamers cards count, bruh', true)
})

socket.on('card for dealer, bruh', card => {
  displayDealerCard(card.name)
  socket.emit('lemmy gamers cards count, bruh', false)
})

socket.on('user cards count, bruh', cardCount => {
  console.log(cardCount);
  yourTotal.innerText = cardCount
})

socket.on('dealer cards count, bruh', cardCount => {
  dealerTotal.innerText = cardCount
  if (pannel.innerHTML === `<button class="restart">Restart Game</button>`) {
    if(dealerTotal.innerText < 16) {
      socket.emit('lemmy only one card, bruh', false)
    } else socket.emit('open card')
  }
})

socket.on('dealer open card, bruh', ({cardCount, card}) => {
  // displayDealerCard()
  dealerHand.firstElementChild.setAttribute('src', `./static/PNG/${card.name}.png`);
  dealerTotal.innerText = cardCount
})