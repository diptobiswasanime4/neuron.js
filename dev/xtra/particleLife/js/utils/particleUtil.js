import { UNIVERSAL_FORCE, PARTICLE_MASS } from "../env/variables.js";

export function distanceBetweenTwoParticles(p1, p2) {
  let xDist = p2.x - p1.x;
  let yDist = p2.y - p1.y;
  let sqDist = Math.pow(xDist, 2) + Math.pow(yDist, 2);
  let dist = Math.sqrt(sqDist);
  return { dist, xDist, yDist };
}

export function forceBetweenTwoParticles(p1, p2) {
  let xDiff = p2.x - p1.x;
  let yDiff = p2.y - p1.y;
  let dist = distanceBetweenTwoParticles(p1, p2);
  let force = Math.pow(PARTICLE_MASS, 2) / Math.pow(dist.dist, 2);
  let forceX = force * (xDiff / dist.dist);
  let forceY = force * (yDiff / dist.dist);
  return { force, forceX, forceY };
}
