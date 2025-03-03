const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

function drawEye() {}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 50;
    this.vx = 1;
    this.vy = 1;
    this.angle = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    // eye white
    ctx.beginPath();
    ctx.arc(
      this.x + this.radius / 2,
      this.y - this.radius / 2,
      this.radius / 2,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius / 2,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    // eye ball
    ctx.beginPath();
    ctx.arc(
      this.x + this.radius / 2,
      this.y - this.radius / 2,
      this.radius / 4,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius / 4,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
  update(ctx) {
    // this.x += this.vx;
    // this.y += this.vy;
    this.draw(ctx);

    if (keys.up.pressed) {
      this.y -= this.vy * Math.cos(this.angle);
      this.x -= this.vx * Math.sin(this.angle);
    }
    if (keys.down.pressed) {
      this.y += this.vy * Math.cos(this.angle);
      this.x += this.vx * Math.sin(this.angle);
    }

    if (keys.left.pressed) {
      this.angle += 0.03;
    }

    if (keys.right.pressed) {
      this.angle -= 0.03;
    }
  }
}

const p = new Particle(200, 200, "blue");

p.draw(ctx);

const keys = {
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
    case "W":
      keys.up.pressed = true;
      break;
    case "s":
    case "S":
      keys.down.pressed = true;
      break;
    case "a":
    case "A":
      keys.left.pressed = true;
      break;
    case "d":
    case "D":
      keys.right.pressed = true;
      break;
  }
});

addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
    case "W":
      keys.up.pressed = false;
      break;
    case "s":
    case "S":
      keys.down.pressed = false;
      break;
    case "a":
    case "A":
      keys.left.pressed = false;
      break;
    case "d":
    case "D":
      keys.right.pressed = false;
      break;
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  p.update(ctx);
}

animate();
