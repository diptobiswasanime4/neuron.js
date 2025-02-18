const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const GRID_ROW_COUNT = 10;
const GRID_COL_COUNT = 10;
const GRID_SIDE = 50;
const UNIVERSAL_FRICTION = 0.02;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 3;
    this.gridX = Math.floor(x / GRID_SIDE);
    this.gridY = Math.floor(y / GRID_SIDE);
    this.vx = Math.random() * 0.1 - 0.05;
    this.vy = Math.random() * 0.1 - 0.05;
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
    if (Math.abs(this.vx) < 0.5) {
      this.vx += this.fx;
    }
    if (Math.abs(this.vy) < 0.5) {
      this.vy += this.fy;
    }
    this.x += this.vx;
    this.y += this.vy;

    if (this.vx > UNIVERSAL_FRICTION) {
      this.vx -= UNIVERSAL_FRICTION;
    } else if (this.vx < -UNIVERSAL_FRICTION) {
      this.vx += UNIVERSAL_FRICTION;
    } else {
      this.vx = 0;
    }

    if (this.vy > UNIVERSAL_FRICTION) {
      this.vy -= UNIVERSAL_FRICTION;
    } else if (this.vy < -UNIVERSAL_FRICTION) {
      this.vy += UNIVERSAL_FRICTION;
    } else {
      this.vy = 0;
    }

    if (this.x >= canvas.width || this.x <= 0) {
      this.vx = -this.vx;
    }
    if (this.y >= canvas.height || this.y <= 0) {
      this.vy = -this.vy;
    }
  }
}

let particles = [];

for (let i = 0; i < 200; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "red"));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update(ctx);
    let gotParticles = getParticles(p);
    let fx = 0;
    let fy = 0;

    p.gridX = Math.floor(p.x / GRID_SIDE);
    p.gridY = Math.floor(p.y / GRID_SIDE);

    for (let i2 = 0; i2 < gotParticles.length; i2++) {
      let p2 = gotParticles[i2];
      let dist = distanceBetweenTwoParticles(p, p2);
      let force = forceBetweenTwoParticles(p, p2);
      if (dist.dist > p2.radius * 1.1 && dist.dist < 50) {
        fx += force.forceX;
        fy += force.forceY;
      } else if (dist.dist <= p2.radius * 1.1) {
        fx = -fx;
        fy = -fy;
      } else if (dist.dist >= 50) {
        // fx = 0;
        // fy = 0;
      }
    }
    p.fx = fx;
    p.fy = fy;
  }
}

animate();

// get particles from grid and neighboring grids
function getParticles(p) {
  let xLeft = (p.gridX - 1) * GRID_SIDE;
  let xRight = (p.gridX + 1) * GRID_SIDE;
  let yTop = (p.gridY - 1) * GRID_SIDE;
  let yBottom = (p.gridY + 1) * GRID_SIDE;
  let gotParticles = [];

  for (let i1 = 0; i1 < particles.length; i1++) {
    let p1 = particles[i1];
    if (p1.x >= xLeft && p1.x <= xRight && p1.y >= yTop && p1.y <= yBottom) {
      gotParticles.push(p1);
    }
  }

  return gotParticles;
}

function forceBetweenTwoParticles(p1, p2) {
  let dist = distanceBetweenTwoParticles(p1, p2);
  let force = 50 / dist.sqDist;
  let forceX = (dist.xDist / dist.dist) * force;
  let forceY = (dist.yDist / dist.dist) * force;
  return { force, forceX, forceY };
}

function distanceBetweenTwoParticles(p1, p2) {
  let xDist = p2.x - p1.x;
  let yDist = p2.y - p1.y;
  let sqDist = Math.pow(xDist, 2) + Math.pow(yDist, 2);
  let dist = Math.sqrt(sqDist);
  return { dist, sqDist, xDist, yDist };
}
