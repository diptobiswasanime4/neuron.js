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

let learningRate = 0.002;

let inputs;
let givenOutputValue;

let epochs = 1;

function relu(x) {
  return Math.max(0, x);
}

function reluDerivative(x) {
  return x > 0 ? 1 : 0;
}

for (let k = 0; k < data.length; k++) {
  inputs = data[k].input;
  givenOutputValue = data[k].output;

  for (let l = 0; l < epochs; l++) {
    // Feedforward
    // Hidden layer with ReLU activation
    for (let i = 0; i < hiddenCount; i++) {
      let sum = 0;
      for (let j = 0; j < inputCount; j++) {
        sum += inputs[j] * hiddenWeights[j][i];
      }
      sum += hiddenBias[i];
      hiddenValues[i] = relu(sum); // Applying ReLU activation
    }

    // Output layer (linear activation)
    for (let i = 0; i < outputCount; i++) {
      let sum = 0;
      for (let j = 0; j < hiddenCount; j++) {
        sum += hiddenValues[j] * outputWeights[j][i];
      }
      sum += outputBias[i];
      outputValue[i] = sum; // No activation on output
    }

    // Backpropagation
    // Output Errors
    let outputErrors = [];
    for (let i = 0; i < outputCount; i++) {
      outputErrors[i] = outputValue[i] - givenOutputValue[i];
    }

    // Adjust output weights & biases
    for (let i = 0; i < outputCount; i++) {
      for (let j = 0; j < hiddenCount; j++) {
        let gradient = outputErrors[i] * hiddenValues[j];
        outputWeights[j][i] -= gradient * learningRate;
      }
      outputBias[i] -= learningRate * outputErrors[i];
    }

    // Hidden layer errors (considering ReLU derivative)
    let hiddenErrors = [];
    for (let i = 0; i < hiddenCount; i++) {
      hiddenErrors[i] = 0;
      for (let j = 0; j < outputCount; j++) {
        hiddenErrors[i] += outputErrors[j] * outputWeights[i][j];
      }
      // Multiply by ReLU derivative
      hiddenErrors[i] *= reluDerivative(hiddenValues[i]);
    }

    // Adjust hidden weights & biases
    for (let i = 0; i < hiddenCount; i++) {
      for (let j = 0; j < inputCount; j++) {
        let gradient = hiddenErrors[i] * inputs[j];
        hiddenWeights[j][i] -= gradient * learningRate;
      }
      hiddenBias[i] -= learningRate * hiddenErrors[i];
    }

    console.log(`Epoch ${l} Output ${outputValue}`);
  }
  console.log(
    `Iter ${k} Input ${inputs}  Given Output ${givenOutputValue} Network Output ${outputValue}`
  );
}
