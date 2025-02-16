import fs from "fs";
import data from "./data.js";

let inputCount = 2;
let hiddenCount = 3;
let outputCount = 2;

let hiddenWeights = [
  [0.2, -0.1, -0.3],
  [0.3, 0.2, 0.5],
];
let hiddenBias = [-0.5, 0.1, 0.2];

let outputWeights = [
  [0.4, -0.2],
  [-0.2, -0.3],
  [0.5, 0.1],
];
let outputBias = [-0.15, -0.4];

let hiddenValues = [];
let outputValue = [];

// console.log(data);

let learningRate = 0.002;

// console.log(inputs);
// console.log(givenOutputValue);

let inputs;
let givenOutputValue;

let epochs = 3;

for (let k = 0; k < data.length; k++) {
  inputs = data[k].input;
  givenOutputValue = data[k].output;

  for (let l = 0; l < epochs; l++) {
    // feed forward
    // hidden layer
    for (let i = 0; i < hiddenCount; i++) {
      let sum = 0;
      for (let j = 0; j < inputCount; j++) {
        sum += inputs[j] * hiddenWeights[j][i];
      }
      sum += hiddenBias[i];
      hiddenValues[i] = sum;
    }

    // console.log(hiddenValues);

    for (let i = 0; i < outputCount; i++) {
      let sum = 0;
      for (let j = 0; j < hiddenCount; j++) {
        sum += hiddenValues[j] * outputWeights[j][i];
      }
      sum += outputBias[i];
      outputValue[i] = sum;
    }

    // console.log(outputValue);

    // back propagation
    // output Errors
    let outputErrors = [];
    for (let i = 0; i < outputCount; i++) {
      outputErrors[i] = outputValue[i] - givenOutputValue[i];
    }

    // console.log(outputErrors);

    // output Weights & Bias adjustment
    for (let i = 0; i < outputCount; i++) {
      for (let j = 0; j < hiddenCount; j++) {
        let gradient = outputErrors[i] * hiddenValues[j];
        outputWeights[j][i] -= gradient * learningRate;
      }
      outputBias[i] -= learningRate * outputErrors[i];
    }

    // console.log(outputWeights);
    // console.log(outputBias);

    // hidden errors
    let hiddenErrors = [];
    for (let i = 0; i < hiddenCount; i++) {
      hiddenErrors[i] = 0;
      for (let j = 0; j < outputCount; j++) {
        hiddenErrors[i] += outputErrors[j] + outputWeights[i][j];
      }
    }

    // console.log(hiddenErrors);

    // hidden weights & bias
    for (let i = 0; i < hiddenCount; i++) {
      for (let j = 0; j < inputCount; j++) {
        let gradient = hiddenErrors[i] * inputs[j];
        hiddenWeights[j][i] -= gradient * learningRate;
      }
      hiddenBias[i] -= learningRate * hiddenErrors[i];
    }

    // console.log(hiddenWeights);
    // console.log(hiddenBias);
    console.log(`Epoch ${l} Output ${outputValue}`);
  }
  console.log(
    `Iter ${k} Input ${inputs}  Given Output ${givenOutputValue} Network Output ${outputValue}`
  );
}

const weightsData = {
  hiddenWeights,
  hiddenBias,
  outputWeights,
  outputBias,
};

fs.writeFileSync("weights.json", JSON.stringify(weightsData, null, 2), "utf-8");
