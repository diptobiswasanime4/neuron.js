export function neuronOutput(inputs, weights, bias) {
  let output = 0;
  if (weights.length == inputs.length) {
    for (let i = 0; i < weights.length; i++) {
      output += inputs[i] * weights[i];
    }
  } else {
    console.log("Shape error!!!");
    return;
  }
  output += bias;
  return output;
}
