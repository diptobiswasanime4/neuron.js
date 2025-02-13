import data from "./data.js";
import fs from "fs";

let inputCount = 2;
let hiddenCount = 3;
let outputCount = 2;

let hiddenWeights = [
  [0.2, -0.1, -0.3],
  [0.3, 0.2, 0.5],
];
let hiddenBias = [-0.5, 0.1, 0.2];
let hiddenValues = [];

let outputWeights = [
  [0.4, -0.2],
  [-0.2, -0.3],
  [0.5, 0.1],
];
let outputBias = [-0.15, -0.4];
let outputValue = [];

// let inputs = [2, 3];
// let givenOutputValue = [5, -1];

let inputs = [];
let givenOutputValue = [];

let epochs = 3;
let learningRate = 0.005;

for (let i = 0; i < data.length; i++) {
  //   console.log(data[i].input);
  //   console.log(data[i].output);

  inputs = data[i].input;
  givenOutputValue = data[i].output;

  for (let k = 0; k < epochs; k++) {
    // hidden layer
    for (let i = 0; i < hiddenCount; i++) {
      let sum = 0;
      for (let j = 0; j < inputCount; j++) {
        sum += inputs[j] * hiddenWeights[j][i];
      }
      sum += hiddenBias[i];
      hiddenValues[i] = sum;
    }

    console.log(hiddenValues);

    // output layer
    for (let i = 0; i < outputCount; i++) {
      let sum = 0;
      for (let j = 0; j < hiddenCount; j++) {
        sum += hiddenValues[j] * outputWeights[j][i];
      }
      sum += outputBias[i];
      outputValue[i] = sum;
    }

    console.log(outputValue);

    // output Errors
    let outputErrors = [];
    for (let i = 0; i < outputCount; i++) {
      outputErrors[i] = outputValue[i] - givenOutputValue[i];
    }

    console.log(outputErrors);

    // output Weights & Bias
    for (let i = 0; i < outputCount; i++) {
      for (let j = 0; j < hiddenCount; j++) {
        let gradient = outputErrors[i] * hiddenValues[j];
        outputWeights[j][i] -= learningRate * gradient;
      }
      outputBias[i] -= learningRate * outputErrors[i];
    }

    console.log(outputWeights);
    console.log(outputBias);

    // Hidden Errors
    let hiddenErrors = [];
    for (let i = 0; i < hiddenCount; i++) {
      hiddenErrors[i] = 0;
      for (let j = 0; j < outputCount; j++) {
        hiddenErrors[i] += outputErrors[j] * outputWeights[i][j];
      }
    }

    console.log(hiddenErrors);

    // Hidden Weights & Bias
    for (let i = 0; i < hiddenCount; i++) {
      for (let j = 0; j < inputCount; j++) {
        let gradient = hiddenErrors[i] * inputs[j];
        hiddenWeights[j][i] -= learningRate * gradient;
      }
      hiddenBias[i] -= learningRate * hiddenErrors[i];
    }

    console.log(hiddenWeights);
    console.log(hiddenBias);

    console.log(`Epoch ${k}: ${outputValue}`);
    // if (k % 100 == 0) {
    // }
  }
  console.log(`Iter ${i} Input ${data[i].input} Output ${data[i].output}`);
}

console.log(data.length);

const weightsData = {
  hiddenWeights,
  hiddenBias,
  outputWeights,
  outputBias,
};

fs.writeFileSync("weights.json", JSON.stringify(weightsData, null, 2), "utf-8");
