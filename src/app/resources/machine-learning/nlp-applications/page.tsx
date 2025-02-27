'use client';

import Link from 'next/link';

export default function NLPApplicationsPage() {
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

      <h1 className="text-4xl font-bold mb-4">Practical NLP Applications</h1>
      
      <div className="flex gap-2 mb-6">
        <span className="px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-medium">Advanced</span>
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">8 hours</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">NLP</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">Transformers</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">BERT</span>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Introduction to Natural Language Processing</h2>
        <p>
          Natural Language Processing (NLP) is a field at the intersection of computer science, artificial 
          intelligence, and linguistics. It focuses on the interaction between computers and human language, 
          particularly how to program computers to process and analyze large amounts of natural language data.
        </p>

        <h2>The Evolution of NLP</h2>
        
        <h3>1. Traditional NLP Approaches</h3>
        <p>
          Early NLP systems relied on rule-based methods and statistical models:
        </p>
        <ul>
          <li><strong>Rule-based systems:</strong> Hand-crafted linguistic rules</li>
          <li><strong>Statistical methods:</strong> N-grams, Hidden Markov Models</li>
          <li><strong>Machine Learning approaches:</strong> SVMs, Random Forests with feature engineering</li>
        </ul>

        <h3>2. Word Embeddings</h3>
        <p>
          Word embeddings revolutionized NLP by representing words as dense vectors in a continuous vector space:
        </p>
        <ul>
          <li><strong>Word2Vec:</strong> Learns word associations from text</li>
          <li><strong>GloVe:</strong> Global Vectors for Word Representation</li>
          <li><strong>FastText:</strong> Extension of Word2Vec that handles subword information</li>
        </ul>

        <h3>3. The Transformer Revolution</h3>
        <p>
          Transformers, introduced in the paper "Attention is All You Need" (2017), changed the landscape of NLP:
        </p>
        <ul>
          <li><strong>Self-attention mechanism:</strong> Allows models to weigh the importance of different words</li>
          <li><strong>Parallelization:</strong> Enables efficient training on large datasets</li>
          <li><strong>Transfer learning:</strong> Pre-train on large corpora, fine-tune on specific tasks</li>
        </ul>

        <h3>4. Modern NLP Models</h3>
        <p>
          Today's state-of-the-art NLP is dominated by large pre-trained models:
        </p>
        <ul>
          <li><strong>BERT:</strong> Bidirectional Encoder Representations from Transformers</li>
          <li><strong>GPT (1-4):</strong> Generative Pre-trained Transformers</li>
          <li><strong>T5:</strong> Text-to-Text Transfer Transformer</li>
          <li><strong>RoBERTa:</strong> Robustly Optimized BERT Approach</li>
          <li><strong>XLNet:</strong> Generalized Autoregressive Pretraining</li>
        </ul>

        <h2>Building Practical NLP Applications</h2>
        
        <h3>1. Text Classification</h3>
        <p>
          Text classification involves assigning categories to text documents. Applications include:
        </p>
        <ul>
          <li>Sentiment analysis</li>
          <li>Spam detection</li>
          <li>Topic categorization</li>
          <li>Intent recognition</li>
        </ul>
        <p>Example using Hugging Face's Transformers library:</p>
        <pre><code className="language-python">{`from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

# Load pre-trained model and tokenizer
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Analyze sentiment
text = "I really enjoyed this movie. The plot was engaging and the characters were well-developed."
inputs = tokenizer(text, return_tensors="pt")
outputs = model(**inputs)
predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
positive_score = predictions[0][1].item()
print(f"Sentiment score (positive): {positive_score:.4f}")`}</code></pre>

        <h3>2. Named Entity Recognition (NER)</h3>
        <p>
          NER identifies and classifies named entities in text into predefined categories such as person names, 
          organizations, locations, etc.
        </p>
        <pre><code className="language-python">{`from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

# Load pre-trained model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("dbmdz/bert-large-cased-finetuned-conll03-english")
model = AutoModelForTokenClassification.from_pretrained("dbmdz/bert-large-cased-finetuned-conll03-english")

# Create NER pipeline
ner = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")

# Extract entities
text = "Apple Inc. was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in Cupertino, California."
entities = ner(text)
for entity in entities:
    print(f"{entity['word']} - {entity['entity_group']} ({entity['score']:.4f})")`}</code></pre>

        <h3>3. Question Answering</h3>
        <p>
          Question answering systems extract answers from text based on questions:
        </p>
        <pre><code className="language-python">{`from transformers import pipeline

# Create question answering pipeline
qa_pipeline = pipeline("question-answering")

# Context and question
context = """
The Transformer architecture was introduced in the paper "Attention is All You Need" 
by Ashish Vaswani et al. in 2017. It has become the foundation for many state-of-the-art 
NLP models including BERT and GPT.
"""
question = "When was the Transformer architecture introduced?"

# Get answer
result = qa_pipeline(question=question, context=context)
print(f"Answer: {result['answer']}")
print(f"Score: {result['score']:.4f}")`}</code></pre>

        <h3>4. Text Generation</h3>
        <p>
          Text generation creates new text based on a prompt:
        </p>
        <pre><code className="language-python">{`from transformers import pipeline

# Create text generation pipeline
generator = pipeline("text-generation", model="gpt2")

# Generate text
prompt = "Artificial intelligence has the potential to"
generated_text = generator(prompt, max_length=100, num_return_sequences=1)
print(generated_text[0]['generated_text'])`}</code></pre>

        <h3>5. Text Summarization</h3>
        <p>
          Summarization condenses text while preserving key information:
        </p>
        <pre><code className="language-python">{`from transformers import pipeline

# Create summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Text to summarize
article = """
Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to natural intelligence 
displayed by animals including humans. AI research has been defined as the field of study of intelligent 
agents, which refers to any system that perceives its environment and takes actions that maximize its 
chance of achieving its goals. The term "artificial intelligence" had previously been used to describe 
machines that mimic and display "human" cognitive skills that are associated with the human mind, such 
as "learning" and "problem-solving". This definition has since been rejected by major AI researchers who 
now describe AI in terms of rationality and acting rationally, which does not limit how intelligence can 
be articulated.
"""

# Generate summary
summary = summarizer(article, max_length=130, min_length=30, do_sample=False)
print(summary[0]['summary_text'])`}</code></pre>

        <h2>Building an End-to-End NLP Application</h2>
        <p>
          Let's walk through creating a simple sentiment analysis API using FastAPI and Hugging Face:
        </p>
        <pre><code className="language-python">{`# app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import uvicorn

# Initialize FastAPI app
app = FastAPI(title="Sentiment Analysis API")

# Load sentiment analysis pipeline
sentiment_analyzer = pipeline("sentiment-analysis")

# Define request model
class TextRequest(BaseModel):
    text: str

# Define endpoint
@app.post("/analyze-sentiment")
async def analyze_sentiment(request: TextRequest):
    try:
        # Analyze sentiment
        result = sentiment_analyzer(request.text)[0]
        return {
            "text": request.text,
            "sentiment": result["label"],
            "score": result["score"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the API
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
`}</code></pre>

        <h2>Advanced NLP Techniques</h2>
        
        <h3>1. Fine-tuning Pre-trained Models</h3>
        <p>
          Adapting pre-trained models to specific tasks or domains:
        </p>
        <pre><code className="language-python">{`from transformers import AutoModelForSequenceClassification, AutoTokenizer, Trainer, TrainingArguments
from datasets import load_dataset

# Load dataset
dataset = load_dataset("imdb")

# Load pre-trained model and tokenizer
model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)

# Tokenize dataset
def tokenize_function(examples):
    return tokenizer(examples["text"], padding="max_length", truncation=True)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=64,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
)

# Create Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],
)

# Fine-tune the model
trainer.train()`}</code></pre>

        <h3>2. Few-shot Learning</h3>
        <p>
          Training models with limited examples:
        </p>
        <pre><code className="language-python">{`from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Load model and tokenizer
model_name = "gpt2-large"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Few-shot prompt for sentiment analysis
prompt = """
Review: This movie was fantastic! The acting was superb.
Sentiment: Positive

Review: I was disappointed with the service at the restaurant.
Sentiment: Negative

Review: The hotel room was clean and comfortable.
Sentiment: Positive

Review: I found the book to be boring and predictable.
Sentiment: Negative

Review: The concert exceeded all my expectations.
Sentiment: """

# Generate completion
input_ids = tokenizer.encode(prompt, return_tensors="pt")
output = model.generate(
    input_ids,
    max_length=len(input_ids[0]) + 5,
    temperature=0.7,
    num_return_sequences=1,
    pad_token_id=tokenizer.eos_token_id
)
generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)`}</code></pre>

        <h2>Future Directions in NLP</h2>
        <p>
          The field of NLP continues to evolve rapidly. Some exciting future directions include:
        </p>
        <ul>
          <li><strong>Multimodal learning:</strong> Combining text with images, audio, and video</li>
          <li><strong>More efficient models:</strong> Reducing computational requirements while maintaining performance</li>
          <li><strong>Multilingual models:</strong> Better support for low-resource languages</li>
          <li><strong>Ethical AI:</strong> Addressing bias, fairness, and transparency in NLP systems</li>
          <li><strong>Domain-specific applications:</strong> Specialized models for healthcare, legal, financial domains</li>
        </ul>

        <h2>Additional Resources</h2>
        <ul>
          <li><a href="https://huggingface.co/course" target="_blank" rel="noopener noreferrer">Hugging Face NLP Course</a></li>
          <li><a href="https://www.deeplearning.ai/natural-language-processing-specialization/" target="_blank" rel="noopener noreferrer">DeepLearning.AI NLP Specialization</a></li>
          <li><a href="https://github.com/huggingface/transformers" target="_blank" rel="noopener noreferrer">Hugging Face Transformers GitHub</a></li>
          <li><a href="https://nlp.stanford.edu/courses/cs224n/" target="_blank" rel="noopener noreferrer">Stanford CS224N: NLP with Deep Learning</a></li>
        </ul>
      </div>
    </div>
  );
} 