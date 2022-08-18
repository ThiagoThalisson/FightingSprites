// * Attack Collisions
function retangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}
// ! End

// * Determine Who's The Winner
function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector("#winnerLabel").style.display = "flex"

  if (player.health === enemy.health) {
    document.querySelector("#winnerLabel").innerHTML = "Tie"
    console.log("Added")
  }

  if (player.health > enemy.health) {
    document.querySelector("#winnerLabel").innerHTML = "Player 1 Wins"
  }

  if (player.health < enemy.health) {
    document.querySelector("#winnerLabel").innerHTML = "Player 2 Wins"
  }
}
// ! End

// * Decrease Timer Function
let timer = 60
let timerId

function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector("#timer").innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}
// ! End
