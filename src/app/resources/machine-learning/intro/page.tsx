'use client';

import Link from 'next/link';

export default function MLIntroPage() {
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

      <h1 className="text-4xl font-bold mb-4">Introduction to Machine Learning</h1>
      
      <div className="flex gap-2 mb-6">
        <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-medium">Beginner</span>
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">5 hours</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">ML</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">AI</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">Fundamentals</span>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>What is Machine Learning?</h2>
        <p>
          Machine Learning (ML) is a subset of artificial intelligence that provides systems the ability to 
          automatically learn and improve from experience without being explicitly programmed. The primary 
          aim is to allow computers to learn automatically without human intervention and adjust actions accordingly.
        </p>

        <h2>Key Concepts</h2>
        
        <h3>1. Types of Machine Learning</h3>
        <p>Machine learning algorithms are typically classified into three broad categories:</p>
        
        <h4>Supervised Learning</h4>
        <p>
          In supervised learning, the algorithm is trained on labeled data. The model learns to map inputs to 
          known outputs, allowing it to predict outputs for new inputs.
        </p>
        <pre><code className="language-python">{`# Simple supervised learning example with scikit-learn
from sklearn.linear_model import LinearRegression
import numpy as np

# Training data
X = np.array([[1], [2], [3], [4]])  # Features
y = np.array([2, 4, 6, 8])          # Labels

# Create and train the model
model = LinearRegression()
model.fit(X, y)

# Make predictions
new_X = np.array([[5], [6]])
predictions = model.predict(new_X)
print(predictions)  # Output: [10. 12.]`}</code></pre>

        <h4>Unsupervised Learning</h4>
        <p>
          Unsupervised learning deals with unlabeled data. The algorithm tries to find patterns or structure 
          in the data without explicit guidance.
        </p>

        <h4>Reinforcement Learning</h4>
        <p>
          In reinforcement learning, an agent learns to make decisions by taking actions in an environment 
          to maximize some notion of cumulative reward.
        </p>

        <h3>2. Common Algorithms</h3>
        <ul>
          <li><strong>Linear Regression:</strong> Predicts a continuous value based on input features</li>
          <li><strong>Logistic Regression:</strong> Used for binary classification problems</li>
          <li><strong>Decision Trees:</strong> Tree-like model of decisions</li>
          <li><strong>Random Forest:</strong> Ensemble of decision trees</li>
          <li><strong>K-Means Clustering:</strong> Groups similar data points together</li>
          <li><strong>Support Vector Machines:</strong> Finds the hyperplane that best separates classes</li>
        </ul>

        <h3>3. The Machine Learning Workflow</h3>
        <ol>
          <li><strong>Data Collection:</strong> Gathering relevant data for your problem</li>
          <li><strong>Data Preprocessing:</strong> Cleaning, normalizing, and preparing data</li>
          <li><strong>Feature Engineering:</strong> Creating meaningful features from raw data</li>
          <li><strong>Model Selection:</strong> Choosing appropriate algorithms</li>
          <li><strong>Training:</strong> Teaching the model using training data</li>
          <li><strong>Evaluation:</strong> Assessing model performance</li>
          <li><strong>Hyperparameter Tuning:</strong> Optimizing model parameters</li>
          <li><strong>Deployment:</strong> Implementing the model in a production environment</li>
        </ol>

        <h2>Practical Example: Iris Flower Classification</h2>
        <p>
          Let's look at a classic machine learning example - classifying iris flowers based on their features:
        </p>
        <pre><code className="language-python">{`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load the iris dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Create and train the model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Make predictions and evaluate
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Model accuracy: {accuracy * 100:.2f}%")`}</code></pre>

        <h2>Getting Started with Machine Learning</h2>
        <p>
          To begin your machine learning journey, you'll need:
        </p>
        <ul>
          <li>Basic understanding of programming (Python is recommended)</li>
          <li>Knowledge of fundamental mathematics (linear algebra, calculus, probability)</li>
          <li>Familiarity with data analysis and visualization</li>
          <li>Understanding of basic statistical concepts</li>
        </ul>

        <h2>Recommended Tools and Libraries</h2>
        <ul>
          <li><strong>Python:</strong> The most popular language for ML</li>
          <li><strong>NumPy:</strong> For numerical computations</li>
          <li><strong>Pandas:</strong> For data manipulation and analysis</li>
          <li><strong>Scikit-learn:</strong> For implementing ML algorithms</li>
          <li><strong>TensorFlow/Keras:</strong> For deep learning</li>
          <li><strong>PyTorch:</strong> Alternative deep learning framework</li>
          <li><strong>Matplotlib/Seaborn:</strong> For data visualization</li>
        </ul>

        <h2>Additional Resources</h2>
        <ul>
          <li><a href="https://www.coursera.org/learn/machine-learning" target="_blank" rel="noopener noreferrer">Andrew Ng's Machine Learning Course</a></li>
          <li><a href="https://www.kaggle.com/learn/intro-to-machine-learning" target="_blank" rel="noopener noreferrer">Kaggle's Intro to Machine Learning</a></li>
          <li><a href="https://scikit-learn.org/stable/tutorial/index.html" target="_blank" rel="noopener noreferrer">Scikit-learn Tutorials</a></li>
        </ul>
      </div>
    </div>
  );
} 