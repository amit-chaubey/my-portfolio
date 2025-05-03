import Link from 'next/link';
import '@/styles/typography.css';

export default function HomePage() {
  return (
    <div className="container-narrow section-padding">
      <section className="content-spacing">
        <h1 className="heading-1">
          Hello! 👋
        </h1>
        
        <p className="body-large">
          I'm Amit Chaubey, a Machine Learning Engineer specializing in Full Stack
          Development, Cloud Architecture, and AI Integration. I focus on building scalable web
          applications and implementing AI-powered solutions.
        </p>

        <p className="body-base text-secondary">
          My mission is to create innovative solutions that bridge the gap between complex
          technologies and user-friendly applications, making technology more accessible to
          everyone.
        </p>

        <p className="body-base text-secondary">
          Explore my{' '}
          <Link href="/posts" className="link-primary">
            technical writings
          </Link>
          , learn about my{' '}
          <Link href="/projects" className="link-primary">
            projects
          </Link>
          , or read more about my{' '}
          <Link href="/about" className="link-primary">
            professional journey
          </Link>
          . 🚀
        </p>

        <div className="content-spacing">
          <h2 className="heading-3">Connect with me:</h2>
          <div className="flex gap-4">
            <a href="https://github.com/amit-chaubey" className="link-secondary flex items-center gap-1">
              <i className="fi fi-brands-github"></i> GitHub
            </a>
            <a href="https://huggingface.co/sweatSmile" className="link-secondary flex items-center gap-1">
              <i className="fi fi-brands-huggingface text-xl"></i> <span className="text-lg">😊</span> Hugging Face
            </a>
            <a href="https://linkedin.com/in/amit-choubey-51296960" className="link-secondary flex items-center gap-1">
              <i className="fi fi-brands-linkedin"></i> LinkedIn
            </a>
            <a href="mailto:amit.katyayana@gmail.com" className="link-secondary flex items-center gap-1">
              <i className="fi fi-rr-envelope"></i> Email
            </a>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <h2 className="heading-2">Featured Projects</h2>
        <div className="content-spacing">
          <article>
            <h3 className="heading-4 font-normal">
              <a href="#" className="link-primary">
                Wikipedia Learning Agent for SEND Children - watch this space 🚧
              </a>
            </h3>
            <p className="body-base text-secondary mt-2">
              An AI-powered educational assistant for children with Special Educational Needs and Disabilities (SEND).
            </p>
          </article>

          <article>
            <h3 className="heading-4 font-normal">
              <a href="#" className="link-primary">
                Enterprise RAG Research Platform - watch this space 🚧
              </a>
            </h3>
            <p className="body-base text-secondary mt-2">
              Advanced Retrieval-Augmented Generation implementations for financial documents analysis.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
} 