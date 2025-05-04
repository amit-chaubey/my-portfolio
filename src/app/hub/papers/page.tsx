'use client';

import { useState } from 'react';
import '@/styles/typography.css';
import { FiDownload, FiExternalLink, FiFilter, FiSearch, FiBookOpen, FiEye } from 'react-icons/fi';

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
          <article key={paper.id} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 dark:hover:shadow-blue-900/40 transition-all duration-200">
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

              <div className="flex gap-4">
                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-primary flex items-center gap-2"
                  >
                    <FiDownload /> Download PDF
                  </a>
                )}
                {paper.localPdfPath && (
                  <a
                    href={paper.localPdfPath}
                    download
                    className="link-primary flex items-center gap-2"
                  >
                    <FiDownload /> Local Download
                  </a>
                )}
                <a
                  href={paper.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-primary flex items-center gap-2"
                >
                  <FiEye /> Preview
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 