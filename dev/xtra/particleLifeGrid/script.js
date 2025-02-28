const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const GRID_SIDE = 50;
const GRID_COLS = 10;
const GRID_ROWS = 10;
const UNIVERSAL_FRICTION = 0.005;

class Particle {
  constructor(x, y, color, colorIndex) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.colorIndex = colorIndex;
    this.gridIndeX = Math.floor(x / GRID_SIDE);
    this.gridIndeY = Math.floor(y / GRID_SIDE);
    this.radius = 2;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
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
    this.vx += this.fx;
    this.vy += this.fy;
    this.x += this.vx;
    this.y += this.vy;
    this.gridIndeX = Math.floor(this.x / GRID_SIDE);
    this.gridIndeY = Math.floor(this.y / GRID_SIDE);

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

    this.draw(ctx);
  }

  getGrid() {
    return {
      x: this.gridIndeX,
      y: this.gridIndeY,
    };
  }
}

let particles = [];

const interactionMatrix = [
  [1, -1, 1],
  [3, 1, 1],
  [1, 1, -3],
];

for (let i = 0; i < 100; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "red", 0));
}

for (let i = 0; i < 100; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "yellow", 1));
}

for (let i = 0; i < 100; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  particles.push(new Particle(x, y, "lightgreen", 2));
}

console.log(getAllParticlesInGrid(4, 4)); // center
console.log(getAllParticlesInUpGrid(4, 4)); // up
console.log(getAllParticlesInDownGrid(4, 4)); // down
console.log(getAllParticlesInLeftGrid(4, 4)); // left
console.log(getAllParticlesInRightGrid(4, 4)); // right
console.log(getAllParticlesInUpRightGrid(4, 4)); // up-right
console.log(getAllParticlesInUpLeftGrid(4, 4)); // up-left
console.log(getAllParticlesInDownRightGrid(4, 4)); // down-right
console.log(getAllParticlesInDownLeftGrid(4, 4)); // down-left

function getAllParticlesInGrid(gx, gy) {
  let allParticles = particles.filter((p) => {
    if (p.gridIndeX == gx && p.gridIndeY == gy) {
      return p;
    }
  });
  return allParticles;
}

function getAllParticlesInUpGrid(gx, gy) {
  let up_gx = gx;
  let up_gy = gy - 1 < 0 ? GRID_ROWS - 1 : gy - 1;
  let up_particles = getAllParticlesInGrid(up_gx, up_gy);
  return up_particles;
}

function getAllParticlesInDownGrid(gx, gy) {
  let down_gx = gx;
  let down_gy = gy + 1 >= GRID_ROWS ? 0 : gy + 1;
  let down_particles = getAllParticlesInGrid(down_gx, down_gy);
  return down_particles;
}

function getAllParticlesInLeftGrid(gx, gy) {
  let left_gx = gx - 1 < 0 ? GRID_COLS - 1 : gx - 1;
  let left_gy = gy;
  let left_particles = getAllParticlesInGrid(left_gx, left_gy);
  return left_particles;
}

function getAllParticlesInRightGrid(gx, gy) {
  let right_gx = gx + 1 >= GRID_COLS ? 0 : gx + 1;
  let right_gy = gy;
  let right_particles = getAllParticlesInGrid(right_gx, right_gy);
  return right_particles;
}

function getAllParticlesInUpRightGrid(gx, gy) {
  let ur_gx = gx + 1 >= GRID_COLS ? 0 : gx + 1;
  let ur_gy = gy - 1 < 0 ? GRID_ROWS - 1 : gy - 1;
  let ur_particles = getAllParticlesInGrid(ur_gx, ur_gy);
  return ur_particles;
}

function getAllParticlesInUpLeftGrid(gx, gy) {
  let ul_gx = gx - 1 < 0 ? GRID_COLS - 1 : gx - 1;
  let ul_gy = gy - 1 < 0 ? GRID_ROWS - 1 : gy - 1;
  let ul_particles = getAllParticlesInGrid(ul_gx, ul_gy);
  return ul_particles;
}

function getAllParticlesInDownRightGrid(gx, gy) {
  let dr_gx = gx + 1 >= GRID_COLS ? 0 : gx + 1;
  let dr_gy = gy + 1 >= GRID_ROWS ? 0 : gy + 1;
  let dr_particles = getAllParticlesInGrid(dr_gx, dr_gy);
  return dr_particles;
}

function getAllParticlesInDownLeftGrid(gx, gy) {
  let dl_gx = gx - 1 < 0 ? GRID_COLS - 1 : gx - 1;
  let dl_gy = gy + 1 >= GRID_ROWS ? 0 : gy + 1;
  let dl_particles = getAllParticlesInGrid(dl_gx, dl_gy);
  return dl_particles;
}

function getAllParticlesInGridAndSurroundingGrids(gx, gy) {
  return [
    ...getAllParticlesInGrid(gx, gy),
    ...getAllParticlesInUpGrid(gx, gy),
    ...getAllParticlesInDownGrid(gx, gy),
    ...getAllParticlesInLeftGrid(gx, gy),
    ...getAllParticlesInRightGrid(gx, gy),
    ...getAllParticlesInUpRightGrid(gx, gy),
    ...getAllParticlesInUpLeftGrid(gx, gy),
    ...getAllParticlesInDownRightGrid(gx, gy),
    ...getAllParticlesInDownLeftGrid(gx, gy),
  ];
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // for (let i = 0; i < GRID_COLS; i++) {
  //   for (let j = 0; j < GRID_ROWS; j++) {
  //     ctx.beginPath();
  //     ctx.strokeStyle = "white";
  //     ctx.lineWidth = 1;
  //     ctx.strokeRect(i * GRID_SIDE, j * GRID_SIDE, GRID_SIDE, GRID_SIDE);
  //     ctx.stroke();
  //     ctx.closePath();
  //   }
  // }
  requestAnimationFrame(animate);
  for (let i1 = 0; i1 < particles.length; i1++) {
    let p1 = particles[i1];
    p1.update(ctx);

    let fx = 0;
    let fy = 0;

    let allParticles = getAllParticlesInGridAndSurroundingGrids(
      p1.gridIndeX,
      p1.gridIndeY
    );

    // interaction between particles
    for (let i2 = 0; i2 < allParticles.length; i2++) {
      let p2 = particles[i2];
      let dist = distance(p1, p2);
      let f = force(p1, p2);
      if (dist.dist > 0 && dist.dist < p1.radius * 10) {
        fx -= f.forceX * 5;
        fy -= f.forceY * 5;
      } else {
        fx += f.forceX * interactionMatrix[p1.colorIndex][p2.colorIndex];
        fy += f.forceY * interactionMatrix[p1.colorIndex][p2.colorIndex];

        // if (p1.color == "red" && p2.color == "yellow") {
        //   fx -= f.forceX;
        //   fy -= f.forceY;
        // } else if (p1.color == "yellow" && p2.color == "red") {
        //   fx += f.forceX * 3;
        //   fy += f.forceY * 3;
        // } else {
        //   fx += f.forceX;
        //   fy += f.forceY;
        // }
      }
    }
    p1.fx = fx;
    p1.fy = fy;
  }
}

animate();

function force(p1, p2) {
  let { xDist, yDist, sqDist, dist } = distance(p1, p2);
  if (dist != 0) {
    let force = 10 / sqDist;
    let forceX = (xDist / dist) * force;
    let forceY = (yDist / dist) * force;
    return { forceX, forceY, force };
  } else {
    return { forceX: 0, forceY: 0, force: 0 };
  }
}

function distance(p1, p2) {
  let xDist = p2.x - p1.x;
  let yDist = p2.y - p1.y;
  let sqDist = xDist * xDist + yDist * yDist;
  let dist = Math.sqrt(sqDist);
  return { xDist, yDist, sqDist, dist };
}
