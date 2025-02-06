import numpy as np

np.random.seed(0)

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

layer_1 = Layer_Dense(4, 6)
layer_2 = Layer_Dense(6, 3)

layer_1.forward(X)
layer_2.forward(layer_1.output)