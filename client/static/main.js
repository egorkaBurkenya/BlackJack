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
  socket.emit('lemmy cards, bruh') 
})

stay.addEventListener('click', e => {
  stay.classList.add('hidden')
  hit.classList.add('hidden')
  restart.classList.remove('hidden')
  socket.emit('open card')

  socket.emit('lemmy cards, bruh') 
})

restart.addEventListener('click', e => {
  socket.emit('restart')
  // socket.emit('lemmy cards, bruh') 
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

const lose = () => {
  info.innerHTML += `<p>You lose 🤔</p>`
  stay.classList.add('hidden')
  hit.classList.add('hidden')
  restart.classList.remove('hidden')
}
const win = () => {
  info.innerHTML += `<p>You win 🤗</p>`
  stay.classList.add('hidden')
  hit.classList.add('hidden')
  restart.classList.remove('hidden')
}
const rashod = () => {
  info.innerHTML += `<p>Расход 😎</p>`
  stay.classList.add('hidden')
  hit.classList.add('hidden')
  restart.classList.remove('hidden')
}

// * socken.on

socket.on('cards count', cardsCount => {
  total.innerText = cardsCount
})

socket.on('card for user, bruh', card => {
  displayYourCard(card.name)
  socket.emit('lemmy gamers cards count, bruh', true)

  socket.emit('lemmy cards, bruh')
})

socket.on('card for dealer, bruh', card => {
  displayDealerCard(card.name)
  socket.emit('lemmy gamers cards count, bruh', false)

  socket.emit('lemmy cards, bruh')
})

socket.on('user cards count, bruh', cardCount => {
  yourTotal.innerText = cardCount
  if (yourTotal.innerText > 21) {
    lose()
  } else if (yourTotal.innerText == 21) {
    win()
  }
})

socket.on('dealer cards count, bruh', cardCount => {
  dealerTotal.innerText = cardCount

  if (!restart.classList.contains('hidden')) {
    if (dealerTotal.innerText == 21) lose()
    if (dealerTotal.innerText < 16) {
      socket.emit('lemmy only one card, bruh', false)
    } else if (dealerTotal.innerText < 21 && !dealerTotal.innerText == 21) {
      if (dealerTotal.innerText > yourTotal.innerText) lose()
      if (dealerTotal.innerText < yourTotal.innerText) win()
      else rashod()
    } else win()
  }

})

socket.on('dealer open card, bruh', ({cardCount, card}) => {
  // displayDealerCard()
  dealerHand.firstElementChild.setAttribute('src', `./static/PNG/${card.name}.png`);
  dealerTotal.innerText = cardCount

  if (dealerTotal.innerText == 21) lose()
  if (dealerTotal.innerText > 21) win()
  if (dealerTotal.innerText < 16) {
    socket.emit('lemmy only one card, bruh', false)
  } else {
    if (dealerTotal.innerText > yourTotal.innerText) lose()
    if (dealerTotal.innerText < yourTotal.innerText) win()
    else rashod()
  }

  

})

// socket.on('end game', card => {
//   displayDealerCard(card.name)
//   socket.emit('lemmy gamers cards count, bruh', false)

//   if (dealerTotal.innerText < 16) {
//     socket.emit('end game')
//     socket.emit('lemmy gamers cards count, bruh', false)
//   } else if (dealerTotal.innerText > 21) {
//     win()
//   } else if (dealerTotal.innerText > yourTotal.innerText) {
//     lose()
//   } else if (dealerTotal.innerText < yourTotal.innerText) {
//     win()
//   }

//   socket.emit('lemmy cards, bruh')
// })


