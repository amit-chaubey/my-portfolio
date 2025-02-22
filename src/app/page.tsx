import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 space-y-12">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Hello! 👋
        </h1>
        
        <p className="text-xl">
          I'm Amit Chaubey, a Machine Learning Engineer specializing in Full Stack
          Development, Cloud Architecture, and AI Integration. I focus on building scalable web
          applications and implementing AI-powered solutions.
        </p>

        <p className="text-lg">
          My mission is to create innovative solutions that bridge the gap between complex
          technologies and user-friendly applications, making technology more accessible to
          everyone.
        </p>

        <p className="text-lg">
          Explore my{' '}
          <a href="/posts" className="text-blue-600 hover:underline">
            technical writings
          </a>
          , learn about my{' '}
          <a href="/projects" className="text-blue-600 hover:underline">
            projects
          </a>
          , or read more about my{' '}
          <a href="/about" className="text-blue-600 hover:underline">
            professional journey
          </a>
          . 🚀
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Connect with me:</h2>
          <div className="flex gap-4">
            <a href="https://github.com/amit-chaubey" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
              GitHub
            </a>
            <a href="https://linkedin.com/in/amit-choubey-51296960" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
              LinkedIn
            </a>
            <a href="mailto:your.email@example.com" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
              Email
            </a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
        <div className="space-y-8">
          <article>
            <h3 className="text-lg font-normal">
              <a href="#" className="text-blue-600 hover:underline">
                Wikipedia Learning Agent for SEND Children
              </a>
            </h3>
            <p className="text-gray-600 mt-1">
              An AI-powered educational assistant for children with Special Educational Needs and Disabilities (SEND).
            </p>
          </article>

          <article>
            <h3 className="text-lg font-normal">
              <a href="#" className="text-blue-600 hover:underline">
                Enterprise RAG Research Platform
              </a>
            </h3>
            <p className="text-gray-600 mt-1">
              Advanced Retrieval-Augmented Generation implementations for financial documents analysis.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
} 