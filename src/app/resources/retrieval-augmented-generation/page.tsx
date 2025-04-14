'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Define types for sections
interface Subsection {
  id: string;
  title: string;
  icon?: string;
}

interface Section {
  id: string;
  title: string;
  icon?: string;
  subsections?: Subsection[];
}

// Table of Contents component
const TableOfContents = ({ sections }: { sections: Section[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-8 border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold">Table of contents</h2>
        <span className="text-lg transition-transform duration-200 transform" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▼</span>
      </div>
      
      {isOpen && (
        <nav className="mt-4 animate-fadeIn">
          <ul className="space-y-1">
            {sections.map((section: Section, index: number) => (
              <li key={index}>
                <a 
                  href={`#${section.id}`} 
                  className="flex items-center py-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {section.icon && <span className="mr-2">{section.icon}</span>}
                  {section.title}
                </a>
                
                {section.subsections && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {section.subsections.map((subsection: Subsection, subIndex: number) => (
                      <li key={subIndex}>
                        <a 
                          href={`#${subsection.id}`} 
                          className="flex items-center py-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          {subsection.icon && <span className="mr-2">{subsection.icon}</span>}
                          {subsection.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default function RAGResourcePage() {
  // Define the sections for the table of contents
  const tocSections: Section[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: '•',
      subsections: []
    },
    {
      id: 'refresher-on-rag',
      title: 'A Refresher on RAG',
      icon: '•',
      subsections: []
    },
    {
      id: 'agentic-systems',
      title: 'What are Agentic Systems?',
      icon: '•',
      subsections: []
    },
    {
      id: 'rag-agentic',
      title: 'What makes RAG Agentic?',
      icon: '•',
      subsections: []
    },
    {
      id: 'agentic-patterns',
      title: 'Agentic Patterns for RAG',
      icon: '•',
      subsections: [
        { id: 'query-analysis', title: 'Query Analysis', icon: '•' },
        { id: 'query-rewriting', title: 'Query Rewriting', icon: '•' },
        { id: 'planning-multi-step', title: 'Planning & Multi-Step Retrieval', icon: '•' },
        { id: 'self-evaluation', title: 'Self Evaluation through Reflection', icon: '•' },
        { id: 'bringing-together', title: 'Bringing It All Together', icon: '•' }
      ]
    },
    {
      id: 'examples',
      title: 'Examples of Agentic RAG Pipelines',
      icon: '•',
      subsections: [
        { id: 'single-agent', title: 'Single Agent Router', icon: '•' },
        { id: 'corrective-rag', title: 'Corrective RAG', icon: '•' },
        { id: 'adaptive-rag', title: 'Adaptive RAG', icon: '•' }
      ]
    },
    {
      id: 'challenges',
      title: 'Challenges & Mitigation Strategies in Agentic RAG',
      icon: '•',
      subsections: []
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      icon: '•',
      subsections: []
    },
    {
      id: 'further-reading',
      title: 'Further Reading',
      icon: '•',
      subsections: []
    }
  ];

  // Add state for the sidebar TOC
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href="/resources" className="text-blue-600 hover:underline flex items-center">
          <span className="mr-2">←</span> Back to Resources
        </Link>
      </div>
      
      <header className="mb-6">
        <div className="flex items-center text-gray-500 mb-2">
          <span className="inline-block mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </span>
          <span>Mar 4, 2025</span>
        </div>
        <h1 className="text-4xl font-bold">Agentic Patterns for RAG Systems</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with table of contents */}
        <div className="lg:w-1/4 lg:sticky lg:top-8 lg:self-start">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div 
              className="flex items-center justify-between cursor-pointer mb-2" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <h2 className="text-xl font-bold">Contents</h2>
              <span className="text-lg transition-transform duration-200 transform" style={{ transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>▼</span>
            </div>
            
            <nav className="transition-all duration-300 overflow-hidden" style={{ maxHeight: sidebarOpen ? '2000px' : '0px' }}>
              <ul className="space-y-1">
                {tocSections.map((section: Section, index: number) => (
                  <li key={index}>
                    <a 
                      href={`#${section.id}`} 
                      className="flex items-center py-1.5 text-blue-600 hover:text-blue-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded transition-colors"
                    >
                      {section.icon && <span className="mr-2">{section.icon}</span>}
                      {section.title}
                    </a>
                    
                    {section.subsections && section.subsections.length > 0 && (
                      <ul className="pl-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 ml-2">
                        {section.subsections.map((subsection: Subsection, subIndex: number) => (
                          <li key={subIndex}>
                            <a 
                              href={`#${subsection.id}`} 
                              className="flex items-center py-1.5 text-blue-600 hover:text-blue-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 rounded transition-colors text-sm"
                            >
                              {subsection.icon && <span className="mr-2">{subsection.icon}</span>}
                              {subsection.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <article className="prose dark:prose-invert max-w-none lg:w-3/4">
          {/* Introduction */}
          <section id="introduction">
            <h2>Introduction</h2>
            <p>
              Retrieval-Augmented Generation (RAG) has emerged as a powerful approach to enhance Large Language Models (LLMs) with external knowledge. However, traditional RAG systems often use fixed, predetermined retrieval strategies that don't adapt to the complexity or specificity of user queries. 
            </p>
            <p>
              This guide introduces agentic patterns for RAG—techniques that make retrieval systems more intelligent, adaptive, and capable of reasoning about their own processes. By adding agency to RAG, we can create systems that understand when and how to retrieve information, iteratively refine their approach, and make intelligent decisions throughout the generation process.
            </p>
          </section>
          
          {/* A Refresher on RAG */}
          <section id="refresher-on-rag">
            <h2>A Refresher on RAG</h2>
            <p>
              Large Language Models (LLMs) or Foundational Models, are powerful but have a critical limitation: they can only generate responses based on their training data, which may be outdated or incomplete.
            </p>
            <p>
              Retrieval-Augmented Generation (RAG) is a technique that addresses this limitation by giving models access to external knowledge. Instead of relying solely on their parameters, RAG-enhanced models retrieve relevant documents from databases, vector stores, or other sources to provide context to the LLM before generating a response. This makes the responses more accurate, up-to-date, and grounded in specific information.
            </p>
            <p>
              The traditional RAG pipeline typically consists of:
            </p>
            <ol>
              <li><strong>Query Processing:</strong> Analyzing the user's question</li>
              <li><strong>Retrieval:</strong> Finding relevant documents based on semantic similarity</li>
              <li><strong>Context Construction:</strong> Preparing the retrieved information</li>
              <li><strong>Generation:</strong> Producing an answer using the LLM with the retrieved context</li>
            </ol>
            <p>
              While effective, these basic RAG systems can be enhanced significantly by adding agentic capabilities.
            </p>
          </section>
          
          {/* What are Agentic Systems? */}
          <section id="agentic-systems">
            <h2>What are Agentic Systems?</h2>
            <p>
              Agentic systems are AI systems that can:
            </p>
            <ul>
              <li><strong>Plan:</strong> Develop strategies to achieve goals</li>
              <li><strong>Reason:</strong> Consider alternatives and make informed decisions</li>
              <li><strong>Act autonomously:</strong> Take actions without explicit step-by-step instructions</li>
              <li><strong>Reflect:</strong> Evaluate their own performance and adapt</li>
            </ul>
            <p>
              In the context of AI, agency refers to a system's ability to make intelligent decisions based on its environment, goals, and past experiences. An agentic system doesn't just follow predetermined steps; it adapts its approach based on the specific situation and desired outcomes.
            </p>
          </section>
          
          {/* What makes RAG Agentic? */}
          <section id="rag-agentic">
            <h2>What makes RAG Agentic?</h2>
            <p>
              Adding agency to RAG systems transforms them from rigid pipelines to adaptive, reasoning-driven processes. Agentic RAG systems can:
            </p>
            <ul>
              <li>Analyze the query to determine the best retrieval strategy</li>
              <li>Rewrite and decompose complex queries into more effective search queries</li>
              <li>Plan multi-step retrieval journeys for complex information needs</li>
              <li>Evaluate the quality of retrieved documents and decide whether to seek more information</li>
              <li>Combine information from multiple sources intelligently</li>
              <li>Adjust their approach based on success or failure</li>
            </ul>
            <p>
              The key difference is that agentic RAG systems make decisions throughout the retrieval and generation process, rather than following a fixed, predetermined sequence of steps.
            </p>
          </section>
          
          {/* Agentic Patterns for RAG */}
          <section id="agentic-patterns">
            <h2>Agentic Patterns for RAG</h2>
            <p>
              Let's explore the key patterns that enable agency in RAG systems:
            </p>
            
            <section id="query-analysis">
              <h3>Query Analysis</h3>
              <p>
                Query analysis involves using the LLM to understand the intent, complexity, and knowledge domains of a user's question before attempting retrieval. 
              </p>
              <p>
                For example, when faced with the query "How has the EU's stance on agricultural subsidies evolved since the 2008 financial crisis?", an agentic RAG system might identify:
              </p>
              <ul>
                <li>This is a complex, multi-part question</li>
                <li>It requires information about EU policies before and after 2008</li>
                <li>Multiple retrieval steps might be necessary</li>
                <li>Documents about both EU policy and economic impacts should be retrieved</li>
              </ul>
              <p>
                Based on this analysis, the system then selects appropriate retrieval strategies rather than simply embedding the whole query and finding similar documents.
              </p>
            </section>
            
            <section id="query-rewriting">
              <h3>Query Rewriting</h3>
              <p>
                Query rewriting transforms the original user query into more effective search queries. This might involve:
              </p>
              <ul>
                <li>Simplification: Breaking down complex queries</li>
                <li>Expansion: Adding related terms or context</li>
                <li>Disambiguation: Clarifying vague terms</li>
                <li>Specialization: Focusing on specific aspects</li>
              </ul>
              <p>
                For instance, the query "What are the environmental impacts of NFTs?" might be rewritten as several search queries:
              </p>
              <ol>
                <li>"Energy consumption of blockchain networks"</li>
                <li>"Carbon footprint of NFT minting"</li>
                <li>"Ethereum environmental impact"</li>
                <li>"Green alternatives to proof-of-work NFTs"</li>
              </ol>
              <p>
                Each rewritten query will likely retrieve more specific and relevant information than the original broad question.
              </p>
            </section>
            
            <section id="planning-multi-step">
              <h3>Planning & Multi-Step Retrieval</h3>
              <p>
                For complex questions, a single retrieval step is often insufficient. Agentic RAG systems can plan a sequence of retrievals, where each step builds on previous information.
              </p>
              <p>
                Consider the question: "How might quantum computing affect modern cryptography systems, and what measures are being developed to address these challenges?"
              </p>
              <p>
                A multi-step retrieval plan might look like:
              </p>
              <ol>
                <li>Retrieve information about current cryptography systems</li>
                <li>Retrieve information about quantum computing capabilities and timelines</li>
                <li>Retrieve specific information about quantum threats to cryptography</li>
                <li>Retrieve information about post-quantum cryptography solutions</li>
                <li>Synthesize the information to provide a comprehensive answer</li>
              </ol>
              <p>
                This sequential approach ensures that each retrieval step is informed by the context gathered in previous steps.
              </p>
            </section>
            
            <section id="self-evaluation">
              <h3>Self Evaluation through Reflection</h3>
              <p>
                Agentic RAG systems can evaluate the quality of their retrievals and generated responses, then adapt accordingly. This involves:
              </p>
              <ul>
                <li>Assessing relevance of retrieved documents</li>
                <li>Identifying gaps in the retrieved information</li>
                <li>Verifying factual consistency</li>
                <li>Determining if additional retrieval is needed</li>
              </ul>
              <p>
                For example, after generating a response, the system might reflect: "My answer about quantum-resistant algorithms doesn't mention recent NIST standardization efforts. I should retrieve more information about NIST's post-quantum cryptography standardization process to complete my response."
              </p>
            </section>
            
            <section id="bringing-together">
              <h3>Bringing It All Together</h3>
              <p>
                These patterns can be combined to create highly effective agentic RAG systems. A typical flow might include:
              </p>
              <ol>
                <li>Analyze the query to understand intent and complexity</li>
                <li>Develop a retrieval plan (single or multi-step)</li>
                <li>Rewrite queries for each retrieval step</li>
                <li>Execute retrievals and evaluate results</li>
                <li>If needed, refine and repeat retrievals</li>
                <li>Generate response with the gathered context</li>
                <li>Evaluate the response and improve if necessary</li>
              </ol>
              <p>
                This integrated approach makes RAG systems more intelligent and capable of handling complex information needs.
              </p>
            </section>
          </section>
          
          {/* Examples of Agentic RAG Pipelines */}
          <section id="examples">
            <h2>Examples of Agentic RAG Pipelines</h2>
            
            <section id="single-agent">
              <h3>Single Agent Router</h3>
              <p>
                A single agent router uses the LLM to analyze the query and decide which retrieval approach to use from a set of available options:
              </p>
              <ul>
                <li><strong>Direct retrieval:</strong> For straightforward factual questions</li>
                <li><strong>Query decomposition:</strong> For complex, multi-part questions</li>
                <li><strong>Tool use:</strong> For questions requiring calculations or specific processing</li>
                <li><strong>No retrieval:</strong> For questions the LLM can answer from its parametric knowledge</li>
              </ul>
              <p>
                This pattern allows the system to select the most appropriate strategy based on the query type, improving efficiency and accuracy.
              </p>
            </section>
            
            <section id="corrective-rag">
              <h3>Corrective RAG</h3>
              <p>
                Corrective RAG implements a feedback loop where the system:
              </p>
              <ol>
                <li>Performs an initial retrieval and response generation</li>
                <li>Evaluates the quality and completeness of the response</li>
                <li>Identifies specific deficiencies or gaps</li>
                <li>Performs targeted follow-up retrievals to address those gaps</li>
                <li>Generates an improved response with the additional information</li>
              </ol>
              <p>
                This pattern is particularly effective for ensuring comprehensiveness and accuracy in responses.
              </p>
            </section>
            
            <section id="adaptive-rag">
              <h3>Adaptive RAG</h3>
              <p>
                Adaptive RAG adjusts its retrieval parameters and strategies based on ongoing performance:
              </p>
              <ul>
                <li>Dynamically modifies the number of documents retrieved</li>
                <li>Adjusts similarity thresholds based on retrieval quality</li>
                <li>Switches between different embedding models or retrieval methods</li>
                <li>Learns from successful and unsuccessful retrievals</li>
              </ul>
              <p>
                This pattern makes the RAG system self-improving over time, as it learns which approaches work best for different types of queries.
              </p>
            </section>
          </section>
          
          {/* Challenges & Mitigation Strategies */}
          <section id="challenges">
            <h2>Challenges & Mitigation Strategies in Agentic RAG</h2>
            <p>
              Implementing agentic RAG systems comes with several challenges:
            </p>
            <ul>
              <li>
                <strong>Computational Overhead:</strong> Agentic patterns often require multiple LLM calls, increasing latency and costs.
                <br />
                <em>Mitigation:</em> Use caching, distilled models for simpler tasks, and efficient architectures.
              </li>
              <li>
                <strong>Error Propagation:</strong> Mistakes in early stages (like query analysis) can cascade throughout the system.
                <br />
                <em>Mitigation:</em> Implement validation steps and fallback mechanisms for critical decision points.
              </li>
              <li>
                <strong>Complexity Management:</strong> Agentic systems can become difficult to debug and maintain.
                <br />
                <em>Mitigation:</em> Use comprehensive logging, tracing, and visualization tools to understand system behavior.
              </li>
              <li>
                <strong>Hallucination Risk:</strong> More complex pipelines can sometimes increase hallucination risks if not properly constrained.
                <br />
                <em>Mitigation:</em> Implement fact verification steps and provide clear sourcing in responses.
              </li>
            </ul>
          </section>
          
          {/* Conclusion */}
          <section id="conclusion">
            <h2>Conclusion</h2>
            <p>
              Agentic RAG represents the next evolution in retrieval-augmented generation systems. By incorporating planning, reasoning, and self-evaluation capabilities, these systems can handle more complex information needs with greater accuracy and adaptability.
            </p>
            <p>
              The key takeaways from this guide are:
            </p>
            <ul>
              <li>Agentic capabilities transform rigid RAG pipelines into adaptive, intelligent systems</li>
              <li>Core patterns include query analysis, rewriting, multi-step retrieval, and self-evaluation</li>
              <li>Different architectural approaches (router, corrective, adaptive) offer flexibility for various use cases</li>
              <li>Challenges exist but can be mitigated with thoughtful system design</li>
            </ul>
            <p>
              As LLMs continue to evolve, agentic RAG systems will play an increasingly important role in creating AI systems that can access, reason with, and effectively utilize external knowledge.
            </p>
          </section>
          
          {/* Further Reading */}
          <section id="further-reading">
            <h2>Further Reading</h2>
            <p>
              To deepen your understanding of agentic RAG systems, consider exploring these resources:
            </p>
            <ul>
              <li><a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noopener noreferrer">Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</a> - The original RAG paper by Lewis et al.</li>
              <li><a href="https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/" target="_blank" rel="noopener noreferrer">Building Systems with the ChatGPT API</a> - DeepLearning.AI short course on building advanced LLM systems</li>
              <li><a href="https://www.langchain.com/" target="_blank" rel="noopener noreferrer">LangChain Documentation</a> - Tools and frameworks for building agentic LLM applications</li>
              <li><a href="https://www.llamaindex.ai/" target="_blank" rel="noopener noreferrer">LlamaIndex</a> - Framework for connecting LLMs with external data sources</li>
              <li><a href="https://arxiv.org/abs/2302.07842" target="_blank" rel="noopener noreferrer">Self-Ask: Measuring and Narrowing the Compositionality Gap in Language Models</a> - Research on self-questioning for better reasoning</li>
              <li><a href="https://www.amazon.com/Natural-Language-Processing-Transformers-Applications/dp/1098136799" target="_blank" rel="noopener noreferrer">Natural Language Processing with Transformers</a> - Book by Lewis Tunstall et al. covering advanced NLP techniques</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
} 