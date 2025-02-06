import * as math from "mathjs";
import { neuronOutput } from "./helper/weightedSum.js";

let inputs = [1.2, 5.1, 2.1];

let weights_1 = [3.1, 2.1, 8.7];
let weights_2 = [4.1, 1.1, 4.7];
let weights_3 = [3.4, 6.1, 2.7];

let weights = [weights_1, weights_2, weights_3];

let bias_1 = 3;
let bias_2 = 5;
let bias_3 = 2;

let bias = [bias_1, bias_2, bias_3];

let output = [
  neuronOutput(inputs, weights_1, bias_1),
  neuronOutput(inputs, weights_2, bias_2),
  neuronOutput(inputs, weights_3, bias_3),
];

let o1 = math.multiply(weights, inputs);

console.log("Output =", output);
console.log("o1 =", o1);
