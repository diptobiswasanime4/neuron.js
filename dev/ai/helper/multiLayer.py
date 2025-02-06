import pandas as pd
import numpy as np

inputs_1 = [1, 2, 3, 2.5]
inputs_2 = [2.0, 5.0, -1.0, 2.0]
inputs_3 = [-1.5, 2.7, 3.3, -0.8]

inputs = [inputs_1, inputs_2, inputs_3]

weights_11 = [0.2, 0.8, -0.5, 1.0]
weights_12 = [0.5, -0.91, 0.26, -0.5]
weights_13 = [-0.26, -0.27, 0.17, 0.87]

weights_1 = [weights_11, weights_12, weights_13]

bias_11 = 2
bias_12 = 3
bias_13 = 0.5

bias_1 = [bias_11, bias_12, bias_13]

weights_21 = [0.1, -0.14, 0.5]
weights_22 = [-0.5, 0.12, -0.33]
weights_23 = [-0.44, 0.73, 0.13]

weights_2 = [weights_21, weights_22, weights_23]

bias_21 = -1
bias_22 = 2
bias_23 = -0.5

bias_2 = [bias_21, bias_22, bias_23]

output_1 = np.dot(inputs, np.array(weights_1).T) + bias_1
print(output_1)

output_2 = np.dot(output_1, np.array(weights_2).T) + bias_2
print(output_2)