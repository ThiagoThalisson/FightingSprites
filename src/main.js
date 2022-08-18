// * Canvas Related Stuff And Phyisics
const canvas = document.querySelector("canvas")
const canvasContext = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 768

const gravity = 0.3

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "../public/background.png",
})

const shop = new Sprite({
  position: {
    x: 580,
    y: 420,
  },
  imageSrc: "../public/shop.png",
  scale: 2.75,
  framesMax: 6,
})
// ! End

// * Player And Enemy Objects
const player = new Fighter({
  imageSrc: "../public/samuraiMack/Idle.png",
  position: {
    x: 10,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 215,
    y: 175,
  },
  sprites: {
    idle: {
      imageSrc: "../public/samuraiMack/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "../public/samuraiMack/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "../public/samuraiMack/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "../public/samuraiMack/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "../public/samuraiMack/Attack1.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "../public/samuraiMack/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "../public/samuraiMack/Death.png",
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 105,
      y: 10,
    },
    width: 150,
    height: 60,
  },
  scale: 2.5,
  framesMax: 8,
})

const enemy = new Fighter({
  imageSrc: "../public/kenji/Idle.png",
  position: {
    x: 965,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 215,
    y: 190,
  },
  sprites: {
    idle: {
      imageSrc: "../public/kenji/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "../public/kenji/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "../public/kenji/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "../public/kenji/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "../public/kenji/Attack1.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "../public/kenji/Take Hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "../public/kenji/Death.png",
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -165,
      y: 10,
    },
    width: 150,
    height: 60,
  },
  scale: 2.5,
  framesMax: 4,
})
// ! End

// * Controls
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
}

window.addEventListener("keydown", (event) => {
  if (!enemy.dead && !player.dead) {
    switch (event.key) {
      case " ":
        player.attack()
        break
      case "w":
        player.velocity.y = -10
        break
      case "a":
        keys.a.pressed = true
        player.lastKey = "a"
        // player.attackBox.offset.x = -50
        break
      case "d":
        keys.d.pressed = true
        player.lastKey = "d"
        // player.attackBox.offset.x = 0
        break
    }

    switch (event.key) {
      case "Shift":
        enemy.attack()
        break
      case "ArrowUp":
        enemy.velocity.y = -10
        break
      case "ArrowRight":
        keys.ArrowRight.pressed = true
        enemy.lastKey = "ArrowRight"
        break
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true
        enemy.lastKey = "ArrowLeft"
        break
    }
  }
  console.log(event.key)
})

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = false
      break
    case "a":
      keys.a.pressed = false
      break
    case "s":
      keys.s.pressed = false
      break
    case "d":
      keys.d.pressed = false
      break
  }

  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false
      break
    case "ArrowRight":
      keys.ArrowRight.pressed = false
      break
    case "ArrowDown":
      keys.ArrowDown.pressed = false
      break
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false
      break
  }

  console.log(event.key)
})
// ! End

// * Decrease Timer Function On utils.js
decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)

  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
  canvasContext

  background.update()
  shop.update()
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // Movement And Idle Conditionals For The Player
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5
    player.switchSprite("run")
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5
    player.switchSprite("run")
  } else {
    player.switchSprite("idle")
  }

  // Player Jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump")
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall")
  }

  // Movement And Idle Conditionals For The Enemy
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5
    enemy.switchSprite("run")
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5
    enemy.switchSprite("run")
  } else {
    enemy.switchSprite("idle")
  }

  // Player Jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump")
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall")
  }

  if (
    retangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    player.isAttacking = false
    enemy.takeHit()

    document.querySelector("#enemyHealth").style.width = enemy.health + "%"
  }

  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  if (
    retangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    enemy.isAttacking = false
    // player.health -= 10
    player.takeHit()

    document.querySelector("#playerHealth").style.width = player.health + "%"
  }

  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  if (player.health === 0 || enemy.health === 0) {
    determineWinner({ player, enemy, timerId })
  }
}
// ! End

animate()
