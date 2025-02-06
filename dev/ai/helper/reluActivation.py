import numpy as np

x1 = [1, 2, 3, 2.5]
x2 = [2.0, 5.0, -1.0, 2.0]
x3 = [-1.5, 2.7, 3.3, -0.8]

X = [x1, x2, x3]

class Layer_Dense:
    def __init__(self, n_inputs, n_neurons):
        self.weights = 0.1 * np.random.randn(n_inputs, n_neurons)
        self.bias = np.zeros((1, n_neurons))
        print(self.weights)
        print(self.bias)
        pass
    def forward(self, inputs):
        self.output = np.dot(inputs, self.weights) + self.bias
        print(self.output)
        pass

class Activation_ReLU:
    def forward(self, inputs):
        self.output = np.maximum(0, inputs)

relu = Activation_ReLU()
output = relu.forward(X)
print(output)