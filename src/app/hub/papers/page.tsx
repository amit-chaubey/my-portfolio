'use client';

import { useState } from 'react';
import { FiDownload, FiExternalLink, FiFilter, FiSearch, FiBookOpen } from 'react-icons/fi';

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
}

const papers: Paper[] = [
  {
    id: '1',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit'],
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    tags: ['NLP', 'Transformers', 'Deep Learning'],
    pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
    localPdfPath: '/papers/attention-is-all-you-need.pdf',
    previewUrl: 'https://arxiv.org/abs/1706.03762',
    publishedDate: '2017-12-06',
    category: 'Natural Language Processing'
  },
  {
    id: '2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee', 'Kristina Toutanova'],
    abstract: 'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.',
    tags: ['NLP', 'BERT', 'Deep Learning', 'Pre-training'],
    pdfUrl: 'https://arxiv.org/pdf/1810.04805.pdf',
    previewUrl: 'https://arxiv.org/abs/1810.04805',
    publishedDate: '2018-10-11',
    category: 'Natural Language Processing'
  },
  {
    id: '3',
    title: 'Deep Residual Learning for Image Recognition',
    authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren', 'Jian Sun'],
    abstract: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions.',
    tags: ['Computer Vision', 'ResNet', 'Deep Learning'],
    pdfUrl: 'https://arxiv.org/pdf/1512.03385.pdf',
    previewUrl: 'https://arxiv.org/abs/1512.03385',
    publishedDate: '2015-12-10',
    category: 'Computer Vision'
  }
];

const categories = ['All', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning'];

export default function PapersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Research Papers</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">Access, download, and explore essential ML/AI research papers</p>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search papers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPapers.map(paper => (
          <div
            key={paper.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {paper.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {paper.authors.join(', ')} • {paper.publishedDate}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {paper.abstract}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {paper.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    <FiDownload />
                    Download from Source
                  </a>
                )}
                {paper.localPdfPath && (
                  <a
                    href={paper.localPdfPath}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                  >
                    <FiDownload />
                    Local Download
                  </a>
                )}
                <a
                  href={paper.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiExternalLink />
                  View Online
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 