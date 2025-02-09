import {
  UNIVERSAL_PARTICLE_BOUNDARY,
  UNIVERSAL_FRICTION,
} from "../js/env/variables.js";
import {
  distanceBetweenTwoParticles,
  forceBetweenTwoParticles,
} from "../js/utils/particleUtil.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth * 0.9;
canvas.height = innerHeight * 0.9;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 3;
    this.vx = 3;
    this.vy = 3;
    this.fx = 0.05;
    this.fy = 0.05;
    this.m = 1;
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

    // Applying Round World
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

    // Applying friction
    if (this.vx > 0) {
      this.vx -= UNIVERSAL_FRICTION;
    } else if (this.vx < 0) {
      this.vx += UNIVERSAL_FRICTION;
    }
    if (this.vy > 0) {
      this.vy -= UNIVERSAL_FRICTION;
    } else if (this.vy < 0) {
      this.vy += UNIVERSAL_FRICTION;
    }
  }
}

let particles = [];

for (let i = 0; i < 50; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "red"));

  x = Math.random() * canvas.width;
  y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "blue"));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p1, i1) => {
    p1.update(ctx);
    particles.forEach((p2, i2) => {
      let dist = distanceBetweenTwoParticles(p1, p2);
      if (dist.dist < 10) {
      }
    });
  });
}

animate();
