import pandas as pd
import numpy as np

inputs_1 = [1, 2, 3, 2.5]
inputs_2 = [2.0, 5.0, -1.0, 2.0]
inputs_3 = [-1.5, 2.7, 3.3, -0.8]

inputs = [inputs_1, inputs_2, inputs_3]

weights_1 = [0.2, 0.8, -0.5, 1.0]
weights_2 = [0.5, -0.91, 0.26, -0.5]
weights_3 = [-0.26, -0.27, 0.17, 0.87]

weights = [weights_1, weights_2, weights_3]

bias_1 = 2
bias_2 = 3
bias_3 = 0.5

bias = [bias_1, bias_2, bias_3]

output = np.dot(inputs, np.array(weights).T) + bias
print(output)