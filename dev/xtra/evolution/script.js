const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerHeight;
canvas.height = innerHeight * 0.9;

let start = true;

const speed = document.getElementById("speed").value;
const life = document.getElementById("life").value;
const regrowth = document.getElementById("regrowth").value;
const radius = document.getElementById("radius").value;
const greenCount = document.getElementById("greenCount").value;
const blueCount = document.getElementById("blueCount").value;
const redCount = document.getElementById("redCount").value;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = color == "green" ? 0 : Math.random() * 4 - 2;
    this.vy = color == "green" ? 0 : Math.random() * 4 - 2;
    this.radius = 5;
    this.life = 500;
    this.foodConsumed = 0;
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
    this.x += this.vx;
    this.y += this.vy;
    if (this.color != "green") {
      this.life -= 1;
    }

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
  }
}

let particles = [];

for (let i = 0; i < 50; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "green"));
}

for (let i = 0; i < 50; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "blue"));
}

for (let i = 0; i < 5; i++) {
  x = Math.random() * canvas.width;
  y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "red"));
}

setInterval(() => {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "green"));
}, 100);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p1, i1) => {
    p1.update(ctx);
    if (p1.life == 0) {
      particles.splice(i1, 1);
    }
    particles.forEach((p2, i2) => {
      let dist = distanceBetweenTwoParticles(p1, p2);

      if (dist.dist < p1.radius) {
        if (p1.color == "blue") {
          if (p2.color == "green") {
            particles.splice(i2, 1);
            particles.push(new Particle(p1.x, p1.y, "blue"));
            p1.life = 500;
            p1.foodConsumed = 0;
          } else if (p2.color == "red") {
            particles.splice(i1, 1);
            p2.life = 500;
            p2.foodConsumed += 1;
            if (p2.foodConsumed == 3) {
              particles.push(new Particle(p2.x, p2.y, "red"));
              p2.foodConsumed = 0;
            }
          }
        }
      }
    });
  });
}

animate();

function distanceBetweenTwoParticles(p1, p2) {
  let xDist = p2.x - p1.x;
  let yDist = p2.y - p1.y;
  let sqDist = Math.pow(xDist, 2) + Math.pow(yDist, 2);
  let dist = Math.sqrt(sqDist);
  return { dist, xDist, yDist };
}
