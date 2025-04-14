'use client';

import { ResourceCard } from '@/components/resources/ResourceCard';
import { ResourceTrack } from '@/components/resources/ResourceTrack';

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8">Learning Resources</h1>
      
      <div className="space-y-16">

        <ResourceTrack 
          title="Machine Learning" 
          description="Fundamentals, algorithms, and practical implementations"
          resources={[
            {
              title: "Agentic Patterns for RAG",
              description: "Learn how to enhance Retrieval-Augmented Generation systems with agency and decision-making capabilities",
              difficulty: "Intermediate",
              estimatedTime: "30 minutes",
              tags: ["RAG", "LLMs", "AI Agents", "NLP"],
              link: "/resources/retrieval-augmented-generation"
            },
            {
              title: "Introduction to Machine Learning",
              description: "Learn the basics of machine learning algorithms and concepts",
              difficulty: "Beginner",
              estimatedTime: "5 hours",
              tags: ["ML", "AI", "Fundamentals"],
              link: "/resources/machine-learning/intro"
            },
            {
              title: "Neural Networks Explained",
              description: "Understanding the architecture and training of neural networks",
              difficulty: "Intermediate",
              estimatedTime: "4 hours",
              tags: ["Neural Networks", "Deep Learning", "AI"],
              link: "/resources/machine-learning/neural-networks"
            },
            {
              title: "Practical NLP Applications",
              description: "Building real-world natural language processing solutions",
              difficulty: "Advanced",
              estimatedTime: "8 hours",
              tags: ["NLP", "Transformers", "BERT"],
              link: "/resources/machine-learning/nlp-applications"
            }
          ]}
        />

        {/* <ResourceTrack 
          title="Career Development" 
          description="Skills and strategies for tech career growth"
          resources={[
            {
              title: "Technical Interview Preparation",
              description: "Strategies and practice for coding interviews",
              difficulty: "Intermediate",
              estimatedTime: "10 hours",
              tags: ["Interviews", "Algorithms", "Problem Solving"],
              link: "/resources/career/tech-interviews"
            },
            {
              title: "Building a Developer Portfolio",
              description: "Create an impressive portfolio to showcase your skills",
              difficulty: "Beginner",
              estimatedTime: "6 hours",
              tags: ["Portfolio", "Personal Branding", "Projects"],
              link: "/resources/career/developer-portfolio"
            }
          ]} */}
        {/* /> */}
      </div>
    </div>
  );
} 