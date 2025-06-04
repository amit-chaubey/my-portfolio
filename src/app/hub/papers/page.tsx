'use client';

import { useState } from 'react';
import '@/styles/typography.css';
import { FiFilter, FiSearch } from 'react-icons/fi';
import PaperViewer from '@/components/papers/PaperViewer';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  tags: string[];
  pdfUrl?: string;
  localPdfPath?: string;
  previewUrl: string;
  publishedDate: string;
  category: string;
  explanation: string;
}

const papers: Paper[] = [
  {
    id: '4',
    title: 'AlphaEvolve: A Novel Approach to Neural Architecture Evolution',
    authors: ['Amit Chaubey'],
    abstract: 'A groundbreaking approach to neural architecture evolution that combines evolutionary algorithms with deep learning principles to optimize neural network architectures. This paper introduces a novel methodology for automatically discovering efficient neural network architectures through an evolutionary process.',
    tags: ['Neural Architecture Search', 'Evolutionary Algorithms', 'Deep Learning'],
    pdfUrl: '/papers/AlphaEvolve.pdf',
    localPdfPath: '/papers/AlphaEvolve.pdf',
    previewUrl: '/papers/AlphaEvolve.pdf',
    publishedDate: '2024-03-20',
    category: 'Deep Learning',
    explanation: `AlphaEvolve represents a significant advancement in the field of Neural Architecture Search (NAS) by introducing a novel evolutionary approach to optimizing neural network architectures. This research combines principles from evolutionary algorithms with deep learning to create a system that can automatically discover efficient neural network architectures.

The key innovation of AlphaEvolve lies in its ability to evolve neural network architectures through a process of selection, mutation, and crossover, similar to biological evolution. The system starts with a population of neural network architectures and iteratively improves them based on their performance on specific tasks. This approach allows for the discovery of architectures that might not be found through traditional design methods or other NAS techniques.

One of the main advantages of AlphaEvolve is its ability to explore a vast space of possible architectures while maintaining computational efficiency. The evolutionary process is guided by fitness functions that consider not only the accuracy of the models but also their computational requirements, making it suitable for deployment in resource-constrained environments.

The paper demonstrates the effectiveness of AlphaEvolve across various domains, including computer vision, natural language processing, and reinforcement learning. The evolved architectures consistently achieve competitive or superior performance compared to hand-designed networks and other automated architecture search methods.

AlphaEvolve's impact extends beyond architecture optimization. It provides insights into the fundamental principles of neural network design and offers a framework for understanding how different architectural choices affect model performance. The methodology can be adapted to various deep learning tasks and has the potential to accelerate the development of new neural network architectures.

In conclusion, AlphaEvolve represents a significant step forward in automating neural network design through evolutionary algorithms. Its ability to discover efficient architectures while considering computational constraints makes it a valuable tool for researchers and practitioners in the field of deep learning.`
  },
  {
    id: '1',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit'],
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    tags: ['NLP', 'Transformers', 'Deep Learning'],
    pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
    localPdfPath: '/papers/attention-all-you-need.pdf',
    previewUrl: 'https://arxiv.org/abs/1706.03762',
    publishedDate: '2017-12-06',
    category: 'Natural Language Processing',
    explanation: `"Attention Is All You Need" is a landmark paper that introduced the Transformer architecture, fundamentally changing the landscape of natural language processing (NLP) and deep learning. Prior to this work, most state-of-the-art models for sequence transduction tasks, such as machine translation, relied heavily on recurrent neural networks (RNNs) or convolutional neural networks (CNNs). These models, while effective, suffered from limitations in parallelization and struggled with long-range dependencies due to their sequential nature. The Transformer model, proposed by Vaswani et al. in 2017, dispensed with recurrence and convolutions entirely, relying solely on a mechanism known as self-attention.

The core innovation of the Transformer is the self-attention mechanism, which allows the model to weigh the importance of different words in an input sequence, regardless of their position. This enables the model to capture long-range dependencies more effectively and in a highly parallelizable manner, significantly speeding up training times. The architecture consists of an encoder and a decoder, both built from stacks of identical layers. Each layer contains multi-head self-attention mechanisms and position-wise feed-forward networks, with residual connections and layer normalization to facilitate training.

One of the key advantages of the Transformer is its ability to process entire sequences simultaneously, rather than step-by-step as in RNNs. This not only improves computational efficiency but also allows the model to learn richer representations of the data. The use of positional encoding compensates for the lack of recurrence, enabling the model to capture the order of the sequence.

The impact of this paper has been profound. The Transformer has become the foundation for virtually all modern NLP models, including BERT, GPT, T5, and many others. Its influence extends beyond NLP, with adaptations in computer vision, audio processing, and even reinforcement learning. The model's scalability and effectiveness have enabled breakthroughs in tasks such as language modeling, translation, summarization, and question answering.

In summary, "Attention Is All You Need" introduced a paradigm shift in deep learning by demonstrating that attention mechanisms alone are sufficient for sequence modeling. The Transformer architecture has set new standards for performance and efficiency, and its legacy continues to drive innovation across the field of artificial intelligence.`
  },
  {
    id: '2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee', 'Kristina Toutanova'],
    abstract: 'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.',
    tags: ['NLP', 'BERT', 'Deep Learning', 'Pre-training'],
    pdfUrl: 'https://arxiv.org/pdf/1810.04805.pdf',
    localPdfPath: '/papers/bert.pdf',
    previewUrl: 'https://arxiv.org/abs/1810.04805',
    publishedDate: '2018-10-11',
    category: 'Natural Language Processing',
    explanation: `BERT (Bidirectional Encoder Representations from Transformers) is a groundbreaking model in the field of natural language processing (NLP) that has set new standards for a wide range of language understanding tasks. Introduced by Devlin et al. in 2018, BERT leverages the Transformer architecture, specifically its encoder, to learn deep bidirectional representations of text. Unlike previous models that processed text either left-to-right or right-to-left, BERT is designed to consider both directions simultaneously, allowing it to capture richer context and nuanced meaning in language.

The key innovation of BERT is its pre-training approach. The model is first trained on large amounts of unlabeled text using two unsupervised tasks: Masked Language Modeling (MLM) and Next Sentence Prediction (NSP). In MLM, random words in a sentence are masked, and the model learns to predict them based on the surrounding context. NSP trains the model to understand relationships between sentences by predicting whether one sentence follows another in the original text. This dual pre-training enables BERT to develop a deep understanding of language structure, semantics, and relationships between words and sentences.

After pre-training, BERT can be fine-tuned on specific downstream tasks, such as question answering, sentiment analysis, and named entity recognition, with minimal additional training. This transfer learning capability has made BERT highly versatile and effective across a wide range of NLP applications. The model's bidirectional nature allows it to excel in tasks that require understanding the full context of a word or phrase, rather than relying solely on preceding or following text.

BERT's impact on the NLP community has been immense. It achieved state-of-the-art results on numerous benchmarks, including the Stanford Question Answering Dataset (SQuAD), the General Language Understanding Evaluation (GLUE) benchmark, and others. Its architecture has inspired a new generation of models, such as RoBERTa, ALBERT, and DistilBERT, each building on the principles established by BERT.

In summary, BERT represents a major advancement in language modeling by introducing deep bidirectional context and a powerful pre-training and fine-tuning paradigm. Its success has transformed the way researchers and practitioners approach NLP tasks, making it a foundational model in the field.`
  },
  {
    id: '3',
    title: 'Deep Residual Learning for Image Recognition',
    authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren', 'Jian Sun'],
    abstract: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions.',
    tags: ['Computer Vision', 'ResNet', 'Deep Learning'],
    pdfUrl: 'https://arxiv.org/pdf/1512.03385.pdf',
    localPdfPath: '/papers/deep-residual-learning.pdf',
    previewUrl: 'https://arxiv.org/abs/1512.03385',
    publishedDate: '2015-12-10',
    category: 'Computer Vision',
    explanation: `"Deep Residual Learning for Image Recognition" is a seminal paper that introduced the concept of residual networks (ResNets), fundamentally changing the way deep neural networks are designed and trained. Prior to this work, increasing the depth of neural networks often led to degradation problems, where adding more layers resulted in higher training and test errors. This was counterintuitive, as deeper models should, in theory, be able to represent more complex functions. The authors, led by Kaiming He, addressed this issue by proposing a residual learning framework that allows networks to be substantially deeper without suffering from these optimization difficulties.

The core idea behind ResNet is the introduction of shortcut connections, or skip connections, that bypass one or more layers. Instead of each layer learning an unreferenced function, the layers are explicitly designed to learn residual functions with reference to the layer inputs. This means that each block in the network learns the difference between the input and the desired output, making it easier for the optimizer to adjust the weights and propagate gradients through the network. This simple yet powerful idea enables the training of networks with hundreds or even thousands of layers, leading to significant improvements in accuracy on challenging benchmarks such as ImageNet.

ResNets have several key advantages. They mitigate the vanishing gradient problem, facilitate the flow of information through the network, and enable the construction of much deeper architectures. The original ResNet models achieved state-of-the-art performance in image classification, object detection, and segmentation tasks, and their influence has extended to other domains, including natural language processing and speech recognition.

The impact of this paper has been far-reaching. ResNet architectures have become a standard building block in modern deep learning, inspiring numerous variants and extensions such as DenseNet, Wide ResNet, and ResNeXt. The concept of residual learning has also been integrated into generative models, reinforcement learning, and other areas of artificial intelligence.

In conclusion, "Deep Residual Learning for Image Recognition" provided a breakthrough in training deep neural networks by introducing residual connections. This innovation has enabled the development of deeper, more accurate models and has had a lasting influence on the field of deep learning.`
  }
];

const categories = ['All', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning'];

export default function PapersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-default section-padding">
      <div className="content-spacing">
        <h1 className="heading-1">Research Papers</h1>
        <p className="body-large text-secondary">
          Access, download, and explore essential ML/AI research papers
        </p>
      </div>

      <div className="content-spacing">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search papers by title, abstract, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="body-base w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="body-base px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map(paper => (
          <article 
            key={paper.id} 
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 dark:hover:shadow-blue-900/40 transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedPaper(paper)}
          >
            <div className="content-spacing">
              <div>
                <h2 className="heading-3">{paper.title}</h2>
                <p className="body-small text-secondary">
                  {paper.authors.join(', ')} • {paper.publishedDate}
                </p>
              </div>

              <p className="body-base text-secondary line-clamp-3">{paper.abstract}</p>

              <div className="flex flex-wrap gap-2">
                {paper.tags.map(tag => (
                  <span
                    key={tag}
                    className="body-small px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedPaper && (
        <PaperViewer
          paper={selectedPaper}
          onClose={() => setSelectedPaper(null)}
        />
      )}
    </div>
  );
} 