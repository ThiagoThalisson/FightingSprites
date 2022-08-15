const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

const gravity = 0.3

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: '../public/background.png'
})

const shop = new Sprite({
    position: {
        x: 580,
        y: 420
    },
    imageSrc: '../public/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 10,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    // offset: {
    //     x: 0,
    //     y: 0
    // },
    imageSrc: '../public/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 175
    }
})

const enemy = new Fighter({
    position: {
        x: 965,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    // offset: {
    //     x: -50,
    //     y: 0
    // },
    imageSrc: '../public/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 190
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    canvasContext.fillStyle = "black"
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    canvasContext

    background.update()
    shop.update()
    player.update()
    enemy.update()
    
    player.velocity.x = 0
    enemy.velocity.x = 0
    
    // If Statements For The Player
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }
    
    // If Statements For The Enemy
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
    
    if (retangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking) {
            player.isAttacking = false
            enemy.health -= 10
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        }
    if (retangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking) {
            enemy.isAttacking = false
            player.health -= 10
            document.querySelector('#playerHealth').style.width = player.health + '%'
        }

        if (player.health === 0 || enemy.health === 0) {
            determineWinner({player, enemy, timerId})
        }
    }

    
    animate()
    
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case ' ':
                player.attack() 
            break
            case 'w': 
                player.velocity.y = -10
            break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                // player.attackBox.offset.x = -50
            break
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                // player.attackBox.offset.x = 0 
            break
        }
        
        switch (event.key) {
            case 'Shift':
                enemy.attack()
            break
            case 'ArrowUp': 
                enemy.velocity.y = -10
            break
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
            break 
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
            break
        }
        console.log(event.key)
    })
    
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w': 
                keys.w.pressed = false
            break
            case 'a':
                keys.a.pressed = false
            break
            case 's':
                keys.s.pressed = false
            break
            case 'd':
                keys.d.pressed = false
            break
        }
        
        switch (event.key) {
            case 'ArrowUp': 
                keys.ArrowUp.pressed = false
            break
            case 'ArrowRight':
                keys.ArrowRight.pressed = false
            break
            case 'ArrowDown':
                keys.ArrowDown.pressed = false
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false
            break
        }
        
        console.log(event.key)
    })