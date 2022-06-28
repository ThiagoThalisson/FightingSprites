const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

const gravity = 0.3
class Sprite {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 130
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 100, 
            height: 50
        }
        this.color = color
        this.isAttacking   
        this.health = 100
    }

    draw() {
        canvasContext.fillStyle = this.color
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        // Attack Box
        if (this.isAttacking == true) {
            canvasContext.fillStyle = 'green'
            canvasContext.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height) 
        } 
    } 
    
    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x 
        this.attackBox.position.y = this.position.y
         
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
            
        } else {
            this.velocity.y += gravity
        }
        
    }
    
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
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
    },
    offset: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: 965,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    color: 'blue'
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

function retangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y 
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height  
    )
}

let timer = 5 
function decreaseTimer() {
    if (timer > 0) {
        setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML =  timer
    }

    if (player.health === enemy.health && timer === 0) {
        console.log('Tie')
    }

}

decreaseTimer()

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
                player.attackBox.offset.x = -50
            break
            case 'd':
                player.attackBox.offset.x = 0 
                keys.d.pressed = true
                player.lastKey = 'd'
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
                enemy.attackBox.offset.x = 0
            break 
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                enemy.attackBox.offset.x = -50 
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