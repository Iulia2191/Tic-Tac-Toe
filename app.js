const query = document.querySelector.bind(document)
const gameBoard = query('#gameboard')
const infoDisplay = query('#info')
const player1Input = query('#player1')
const player2Input = query('#player2')
const player1Btn = query('.enter-player1')
const player2Btn = query('.enter-player2')
const nameSection1 = query('.name-section1')
const nameSection2 = query('.name-section2')
const paragrafLeft = query('.paragraf-left')
const paragrafRight = query('.paragraf-right')
const rematchButton = query('.rematch-button')

// Enter Players
player1Btn.addEventListener('click', e => {
  e.preventDefault()
  const playerName = player1Input.value.trim()

  if (playerName.length > 0) {
    const formattedName =
      playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase()
    paragrafLeft.innerHTML = `Player 1: <span>${formattedName}</span>`
  }

  nameSection1.style.opacity = '0'
})

player2Btn.addEventListener('click', e => {
  e.preventDefault()
  const playerName = player2Input.value.trim()

  if (playerName.length > 0) {
    const formattedName =
      playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase()
    paragrafRight.innerHTML = `Player 2: <span>${formattedName}</span>`
  }

  nameSection2.style.opacity = '0'
})

// Game
const startCells = ['', '', '', '', '', '', '', '', '']

let go = 'Player1'
infoDisplay.textContent = 'Player 1 goes first'

function createBoard () {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement('div')
    cellElement.classList.add('square')
    cellElement.id = index
    cellElement.addEventListener('click', addGo)
    gameBoard.appendChild(cellElement)
  })
}

createBoard()

function addGo (e) {
  const goDisplay = document.createElement('div')
  goDisplay.classList.add(go)
  e.target.append(goDisplay)
  go = go === 'Player1' ? 'Player2' : 'Player1'
  infoDisplay.textContent = `It is now ${go}'s go.`
  e.target.removeEventListener('click', addGo)
  checkScore()
}
function checkScore () {
  const allSquares = document.querySelectorAll('.square')
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const circleWins = winningCombos.some(array =>
    array.every(cell =>
      allSquares[cell].firstChild?.classList.contains('Player1')
    )
  )

  const crossWins = winningCombos.some(array =>
    array.every(cell =>
      allSquares[cell].firstChild?.classList.contains('Player2')
    )
  )

  if (circleWins) {
    infoDisplay.textContent = 'Player 1 Wins!'
    allSquares.forEach(square => square.removeEventListener('click', addGo))
    return
  }

  if (crossWins) {
    infoDisplay.textContent = 'Player 2  Wins!'
    allSquares.forEach(square => square.removeEventListener('click', addGo))
    return
  }
}

// Rematch button
rematchButton.addEventListener('click', () => {
  go = 'Player1'
  infoDisplay.textContent = 'Player 1 goes first'
  gameBoard.innerHTML = ''
  createBoard()
})
