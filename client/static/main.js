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

// * EventListeners

start.addEventListener('click', e => {
  start.classList.add('hidden')
  hit.classList.remove('hidden')
  stay.classList.remove('hidden')

  socket.emit('lemmy cards, bruh')  
  socket.emit('lemmy only one card, bruh', true)
  socket.emit('lemmy only one card, bruh', true)
  socket.emit('lemmy only one card, bruh', false)
  socket.emit('lemmy only one card, bruh', false)
})

hit.addEventListener('click', e => {
  socket.emit('lemmy only one card, bruh', true)
})

stay.addEventListener('click', e => {
  stay.classList.add('hidden')
  hit.classList.add('hidden')
  restart.classList.remove('hidden')
  if(dealerTotal.innerText < 16) {
    socket.emit('lemmy only one card, bruh', false)
  }
})

// * functions

const displayYourCard = name => {
  yourHand.innerHTML += `<img src="./static/PNG/${name}.png"/>`
}
const displayDealerCard = name => {
  dealerHand.innerHTML += `<img src="./static/PNG/${name}.png"/>`
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
  // ! Когда чел нажимает старт, ты просишь две карты диллеру, а тут ты рисуешь ему карту 
  // ! И тут же снова ее прочишь, если убрать эту строчку, то все работает 
  socket.emit('lemmy gamers cards count, bruh', false)
})

socket.on('user cards count, bruh', cardCount => {
  yourTotal.innerText = cardCount
})

socket.on('dealer cards count, bruh', cardCount => {
  dealerTotal.innerText = cardCount
  // if(dealerTotal.innerText < 16) {
  //   socket.emit('lemmy only one card, bruh', false)
  // }
})