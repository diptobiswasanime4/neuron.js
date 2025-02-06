import pandas as pd
import numpy as np

inputs = [1.2, 5.1, 2.1]

weights_1 = [3.1, 2.1, 8.7]
weights_2 = [4.1, 1.1, 4.7]
weights_3 = [3.4, 6.1, 2.7]

weights = [weights_1, weights_2, weights_3]

bias_1 = 3
bias_2 = 5
bias_3 = 2

bias = [bias_1, bias_2, bias_3]

output = np.dot(weights, inputs) + bias
print(output)