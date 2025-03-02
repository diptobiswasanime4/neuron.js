// 0 - red
// 1 - yellow
// 2 - green
// 3 - blue
// 4 - orange
// 5 - white

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const UNIVERSAL_FRICTION = 0.005;

class Particle {
  constructor(x, y, color, colorIndex) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.colorIndex = colorIndex;
    this.radius = 2;
    this.vx = 0;
    this.vy = 0;
    this.maxVel = 1;
    this.fx = 0;
    this.fy = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(ctx) {
    this.draw(ctx);
    this.vx += this.fx;
    this.vy += this.fy;
    this.x += this.vx;
    this.y += this.vy;

    // max vel
    if (this.vx > this.maxVel) {
      this.vx = this.maxVel;
    } else if (this.vx < -this.maxVel) {
      this.vx = -this.maxVel;
    }
    if (this.vy > this.maxVel) {
      this.vy = this.maxVel;
    } else if (this.vy < -this.maxVel) {
      this.vy = -this.maxVel;
    }
    // universal friction
    if (this.vx >= UNIVERSAL_FRICTION) {
      this.vx -= UNIVERSAL_FRICTION;
    } else if (this.vx <= -UNIVERSAL_FRICTION) {
      this.vx += UNIVERSAL_FRICTION;
    } else {
      this.vx = 0;
    }

    if (this.vy >= UNIVERSAL_FRICTION) {
      this.vy -= UNIVERSAL_FRICTION;
    } else if (this.vy <= -UNIVERSAL_FRICTION) {
      this.vy += UNIVERSAL_FRICTION;
    } else {
      this.vy = 0;
    }

    // round world
    if (this.x > canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.y > canvas.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = canvas.height;
    }
  }
}

const particles = [];

for (let i = 0; i < 100; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "red", 0));
}

for (let i = 0; i < 100; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "blue", 1));
}

for (let i = 0; i < 100; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "green", 2));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i1 = 0; i1 < particles.length; i1++) {
    let p1 = particles[i1];
    p1.update(ctx);

    let fx = 0;
    let fy = 0;

    // interaction between particles
    for (let i2 = 0; i2 < particles.length; i2++) {
      if (i1 == i2) {
        continue;
      }
      let p2 = particles[i2];
      let dist = distance(p1, p2);
      let f = force(p1, p2);
      if (dist.dist < p1.radius * 5) {
        fx -= f.forceX * 3;
        fy -= f.forceY * 3;
      } else if (dist.dist >= p1.radius * 5 && dist.dist < 150) {
        if (p1.color == "red" && p2.color == "yellow") {
          fx -= f.forceX;
          fy -= f.forceY;
        } else if (p1.color == "yellow" && p2.color == "red") {
          fx += f.forceX * 10;
          fy += f.forceY * 10;
        } else {
          fx += f.forceX;
          fy += f.forceY;
        }
      }
    }
    p1.fx = fx;
    p1.fy = fy;
  }
}

const interactionMatrix = [
  [1, -1, 1],
  [1, 5, 1],
  [1, 1, 1],
];

animate();

function force(p1, p2) {
  let { xDist, yDist, sqDist, dist } = distance(p1, p2);
  let force = 10 / sqDist;
  let forceX = (xDist / dist) * force;
  let forceY = (yDist / dist) * force;
  return { forceX, forceY, force };
}

function distance(p1, p2) {
  let xDist = p2.x - p1.x;
  let yDist = p2.y - p1.y;
  let sqDist = xDist * xDist + yDist * yDist;
  let dist = Math.sqrt(sqDist);
  return { xDist, yDist, sqDist, dist };
}
