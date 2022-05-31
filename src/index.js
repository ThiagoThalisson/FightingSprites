const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

const gravity = 0.2
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 130
        this.lastKey
    }
    
    draw() {
        canvasContext.fillStyle = 'blue'
        canvasContext.fillRect(this.position.x, this.position.y, 30, this.height)
    }
    
    update() {
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
            
        } else {
            this.velocity.y += gravity
        }
    }
}

const player = new Sprite({
    position: {
        x: 10,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: 985,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
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

let lasKey 

function animate() {
    window.requestAnimationFrame(animate)
    canvasContext.fillStyle = "black"
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    canvasContext
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
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': 
            player.velocity.y = -10
        break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
        break
        case 's':
            player.velocity.y = 3
        break
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
        break
    }

    switch (event.key) {
        case 'ArrowUp': 
            enemy.velocity.y = -10
        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowDown':
            enemy.velocity.y = 3
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