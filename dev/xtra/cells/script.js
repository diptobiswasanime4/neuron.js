const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.height = innerHeight * 0.9;
canvas.width = canvas.height;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 10;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
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
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
  }
}

let particles = [];

for (let i = 0; i < 5; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "red"));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i1 = 0; i1 < particles.length; i1++) {
    let p1 = particles[i1];
    p1.update(ctx);
    let fx = 0;
    let fy = 0;
    for (let i2 = 0; i2 < particles.length; i2++) {
      if (i1 == i2) continue;
      let p2 = particles[i2];
      let dist = distanceBetweenTwoParticles(p1, p2);
      let force = forceBetweenTwoParticles(p1, p2);
      if (dist.dist > p1.radius * 1.1 && dist.dist < 50) {
        fx += force.forceX;
        fy += force.forceY;
      } else if (dist.dist <= p1.radius * 1.1) {
        fx = -fx;
        fy = -fy;
      } else if (dist.dist >= 50) {
        fx = 0;
        fy = 0;
      }

      //   if (dist.dist < p1.radius * 1.1) {
      //     // repel
      //   } else if (dist.dist < 30 && dist.dist >= p1.radius * 1.1) {
      //     // attract
      //   } else {
      //     // do nothing
      //   }
    }
    p1.ax = fx;
    p1.ay = fy;
  }
}

animate();

// force & acceleration inter-changeable
function forceBetweenTwoParticles(p1, p2) {
  let dist = distanceBetweenTwoParticles(p1, p2);
  let force = 1 / dist.sqDist;
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
