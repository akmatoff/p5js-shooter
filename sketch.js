var player;

var enemies = [];
var bullets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  player = {
    w: 100,
    h: 50,
    x: windowWidth / 2,
    y: windowHeight - 70,
    vx: 0,
    vy: 0,
    speed: 15,
    draw: () => {
      noStroke()
      fill('#33ffcc')
      rect(player.x, player.y, player.w, player.h)
      
      if (player.x < 0) {
        player.x = windowWidth
      } else if (player.x > windowWidth) {
        player.x = 0
      }
    }
  }
  
  setInterval(() => {
    
    var enemy = {
      x: random(windowWidth),
      y: -100,
      w: 70,
      h: 70,
      vy: 0,
      speed: 3,
      draw: () => {
        noStroke()
        fill('#ff0000')
        rect(enemy.x, enemy.y, enemy.w, enemy.h)
      }
    }
    
    enemies.push(enemy)

  }, random(1000, 2000))
  
  setInterval(() => bullets = [], 10000)
}

function keyPressed() {
  
  if (keyCode === 65) {
    player.vx -= player.speed
  } else if (keyCode === 68) {
    player.vx += player.speed
  } 
  
  if (keyCode === 32) {
    var bullet = {
      x: player.x + player.w / 2,
      y: player.y - 15,
      r: 15,
      vy: 0,
      speed: 22,
      draw: () => {
        noStroke()
        fill('#ffffff')
        circle(bullet.x, bullet.y, bullet.r)
      }
    }
    
    bullets.push(bullet) 
    
  }
   
}

function keyReleased() {
  player.vx = player.vy = 0
}

function draw() {
  background("#111");
  
  player.draw()
  player.x += player.vx
  player.y += player.vy
  
  bullets.forEach((b) => {
    b.draw()
    
    b.vy = -b.speed
    b.y += b.vy
    
  })
  
  enemies.forEach((e) => {
    e.draw()
    
    e.vy = e.speed
    e.y += e.vy
    
    if (bullets.length != 0) {
      var lastBullet = bullets[bullets.length - 1]
      
      if (lastBullet.x >= e.x && 
          lastBullet.x <= e.x + e.w && 
          lastBullet.y >= e.y && 
          lastBullet.y <= e.y + e.h) {
        bullets.splice(lastBullet - 1, 1)
        enemies.splice(enemies.indexOf(e), 1)
      }
    }
    
  })
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
