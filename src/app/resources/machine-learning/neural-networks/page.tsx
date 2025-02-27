'use client';

import Link from 'next/link';

export default function NeuralNetworksPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/resources" className="text-blue-600 hover:underline flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Resources
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">Neural Networks Explained</h1>
      
      <div className="flex gap-2 mb-6">
        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">Intermediate</span>
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">4 hours</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">Neural Networks</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">Deep Learning</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">AI</span>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Understanding Neural Networks</h2>
        <p>
          Neural networks are computing systems inspired by the biological neural networks that constitute 
          animal brains. They are the foundation of deep learning, a subset of machine learning that excels 
          at recognizing patterns and making decisions with minimal human intervention.
        </p>

        <h2>The Building Blocks</h2>
        
        <h3>1. Neurons (Nodes)</h3>
        <p>
          The basic unit of a neural network is the neuron or node. Each neuron:
        </p>
        <ul>
          <li>Receives inputs from other neurons or external sources</li>
          <li>Applies weights to these inputs</li>
          <li>Processes them through an activation function</li>
          <li>Produces an output that can be sent to other neurons</li>
        </ul>

        <h3>2. Layers</h3>
        <p>
          Neural networks are organized in layers:
        </p>
        <ul>
          <li><strong>Input Layer:</strong> Receives the initial data</li>
          <li><strong>Hidden Layers:</strong> Intermediate layers where most computation occurs</li>
          <li><strong>Output Layer:</strong> Produces the final result</li>
        </ul>
        <p>
          A network with multiple hidden layers is called a "deep" neural network, hence the term "deep learning."
        </p>

        <h3>3. Weights and Biases</h3>
        <p>
          Connections between neurons have associated weights that determine the strength of the connection. 
          Biases are additional parameters that allow the network to shift the activation function.
        </p>

        <h3>4. Activation Functions</h3>
        <p>
          Activation functions introduce non-linearity into the network, allowing it to learn complex patterns:
        </p>
        <ul>
          <li><strong>Sigmoid:</strong> Maps values to range (0,1)</li>
          <li><strong>ReLU (Rectified Linear Unit):</strong> Returns x if x {'>'} 0, else 0</li>
          <li><strong>Tanh:</strong> Maps values to range (-1,1)</li>
          <li><strong>Softmax:</strong> Used for multi-class classification</li>
        </ul>

        <h2>How Neural Networks Learn</h2>
        
        <h3>1. Forward Propagation</h3>
        <p>
          During forward propagation, input data passes through the network layer by layer, with each neuron 
          applying its weights, bias, and activation function to produce an output.
        </p>

        <h3>2. Loss Function</h3>
        <p>
          The loss function measures how far the network's predictions are from the actual values. Common loss functions include:
        </p>
        <ul>
          <li>Mean Squared Error (for regression)</li>
          <li>Cross-Entropy Loss (for classification)</li>
        </ul>

        <h3>3. Backpropagation</h3>
        <p>
          Backpropagation is the algorithm used to calculate the gradient of the loss function with respect to 
          each weight in the network. It works backward from the output layer to adjust weights.
        </p>

        <h3>4. Optimization</h3>
        <p>
          Optimization algorithms like Gradient Descent update the weights to minimize the loss function:
        </p>
        <pre><code className="language-python">{`# Pseudocode for gradient descent
for epoch in range(num_epochs):
    # Forward pass
    predictions = model(inputs)
    
    # Calculate loss
    loss = loss_function(predictions, targets)
    
    # Backward pass
    loss.backward()
    
    # Update weights
    optimizer.step()
    
    # Reset gradients
    optimizer.zero_grad()`}</code></pre>

        <h2>Types of Neural Networks</h2>
        
        <h3>1. Feedforward Neural Networks (FNN)</h3>
        <p>
          The simplest type of neural network where connections between nodes do not form cycles. 
          Information moves in only one direction—forward—from input nodes, through hidden nodes, to output nodes.
        </p>

        <h3>2. Convolutional Neural Networks (CNN)</h3>
        <p>
          Specialized for processing grid-like data such as images. CNNs use convolutional layers to 
          automatically learn spatial hierarchies of features.
        </p>

        <h3>3. Recurrent Neural Networks (RNN)</h3>
        <p>
          Designed for sequential data where the order matters. RNNs have connections that form cycles, 
          allowing information to persist.
        </p>

        <h3>4. Long Short-Term Memory Networks (LSTM)</h3>
        <p>
          A special kind of RNN capable of learning long-term dependencies, solving the vanishing gradient problem.
        </p>

        <h2>Practical Example: Building a Simple Neural Network</h2>
        <p>
          Let's implement a simple neural network using TensorFlow/Keras:
        </p>
        <pre><code className="language-python">{`import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.datasets import mnist
import numpy as np

# Load and preprocess data
(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train = x_train.reshape(60000, 784).astype('float32') / 255
x_test = x_test.reshape(10000, 784).astype('float32') / 255
y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)

# Build the model
model = Sequential([
    Dense(128, activation='relu', input_shape=(784,)),
    Dense(64, activation='relu'),
    Dense(10, activation='softmax')
])

# Compile the model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train the model
model.fit(x_train, y_train, batch_size=128, epochs=5, validation_split=0.1)

# Evaluate the model
score = model.evaluate(x_test, y_test)
print(f"Test accuracy: {score[1]:.4f}")`}</code></pre>

        <h2>Challenges and Best Practices</h2>
        
        <h3>Challenges</h3>
        <ul>
          <li><strong>Overfitting:</strong> When the model performs well on training data but poorly on new data</li>
          <li><strong>Vanishing/Exploding Gradients:</strong> When gradients become too small or too large during training</li>
          <li><strong>Computational Resources:</strong> Deep networks require significant computing power</li>
        </ul>
        
        <h3>Best Practices</h3>
        <ul>
          <li><strong>Regularization:</strong> Techniques like dropout and L2 regularization to prevent overfitting</li>
          <li><strong>Batch Normalization:</strong> Normalizing layer inputs to stabilize training</li>
          <li><strong>Transfer Learning:</strong> Using pre-trained models as a starting point</li>
          <li><strong>Data Augmentation:</strong> Creating variations of training data to improve generalization</li>
        </ul>

        <h2>Additional Resources</h2>
        <ul>
          <li><a href="https://www.deeplearningbook.org/" target="_blank" rel="noopener noreferrer">Deep Learning Book by Ian Goodfellow</a></li>
          <li><a href="https://www.tensorflow.org/tutorials" target="_blank" rel="noopener noreferrer">TensorFlow Tutorials</a></li>
          <li><a href="https://pytorch.org/tutorials/" target="_blank" rel="noopener noreferrer">PyTorch Tutorials</a></li>
          <li><a href="https://playground.tensorflow.org/" target="_blank" rel="noopener noreferrer">Neural Network Playground</a></li>
        </ul>
      </div>
    </div>
  );
} 