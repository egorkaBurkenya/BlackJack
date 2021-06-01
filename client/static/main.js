const socket = io()

const win = text => () => {
  document.querySelector('.pannel').innerHTML = `<h2 class='lose'> ${text} </h2>`
  document.querySelector('.pannel').innerHTML += `<button class="restart">Restart Game</button>` 
  document.querySelector('.restart').addEventListener('click', () => {
      socket.emit('restart')
      window.location.reload();
  })
}

const youWin = win('You win 🍄')
const youLose = win('You lose')
const rashod = win('расходимся ...')

document.querySelector('.start').addEventListener('click', e => {
  socket.emit('start')
  document.querySelector('.start').style.display = "none"
  document.querySelector('.hit').style.display = "inline-block"
  document.querySelector('.stay').style.display = "inline-block"
})

document.querySelector('.hit').addEventListener('click', e => {
  socket.emit('hit')
})

document.querySelector('.stay').addEventListener('click', e => {
  socket.emit('stay')
})

socket.on('UserCards', ({card1, card2, count}) => {
  let your_count = card1[0].value + card2[0].value
  document.querySelector('.your-count').innerHTML = your_count
  document.querySelector('.cards-count').innerHTML = count
  document.querySelector('.your-cards').innerHTML += `<img class='card' src='static/PNG/${card1[0].name}.png'>`
  document.querySelector('.your-cards').innerHTML += `<img class='card' src='static/PNG/${card2[0].name}.png'>`
  if (parseInt(document.querySelector('.your-count').innerHTML) == 21) {
    youWin()
  } else {
    socket.emit('dealerStart')

  }
})

socket.on('dealerCards', ({card2, count}) => {
  document.querySelector('.dealer-count').innerHTML = card2[0].value
  document.querySelector('.cards-count').innerHTML = count
  document.querySelector('.dealer-cards').innerHTML += `<img class='card hidden' src='static/PNG/green_back.png'>`
  document.querySelector('.dealer-cards').innerHTML += `<img class='card' src='static/PNG/${card2[0].name}.png'>`
})

socket.on('hitedCard', ({card, count}) => {
  document.querySelector('.your-count').innerHTML = parseInt(document.querySelector('.your-count').innerHTML) + card[0].value
  if (parseInt(document.querySelector('.your-count').innerHTML) > 21) {
    document.querySelector('.hit').style.display = 'none'
    document.querySelector('.stay').style.display = 'none'
    youLose()
  }
  document.querySelector('.cards-count').innerHTML = count
  document.querySelector('.your-cards').innerHTML += `<img class='card' src='static/PNG/${card[0].name}.png'>`
})

socket.on('hitedDealerCard', ({card, count}) => {
  document.querySelector('.dealer-count').innerHTML = parseInt(document.querySelector('.dealer-count').innerHTML) + card[0].value
  if (parseInt(document.querySelector('.dealer-count').innerHTML) > 21) {
    youWin()
  }
  document.querySelector('.cards-count').innerHTML = count
  document.querySelector('.dealer-cards').innerHTML += `<img class='card' src='static/PNG/${card[0].name}.png'>`
  socket.emit('stay')
})

socket.on('DealerStop', card => {
  // console.log(card);
  document.querySelector('.dealer-count').innerHTML = parseInt(document.querySelector('.dealer-count').innerHTML) + card[0].value
  document.querySelector('.hidden').setAttribute('src', `static/PNG/${card.name}.png`)
  if (parseInt(document.querySelector('.dealer-count').innerHTML) > 21) {
    youWin()
  } else if (parseInt(document.querySelector('.dealer-count').innerHTML) > parseInt(document.querySelector('.your-count').innerHTML)) {
    youLose()
  } else if (parseInt(document.querySelector('.dealer-count').innerHTML) < parseInt(document.querySelector('.your-count').innerHTML)) {
    youWin()
  } else {
    rashod()
  }
})
