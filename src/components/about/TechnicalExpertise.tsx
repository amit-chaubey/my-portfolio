export function TechnicalExpertise() {
  const expertise = {
    Frontend: ["React.js", "Next.js", "TypeScript"],
    Backend: ["Node.js", "Python", "Express", "SQL"],
    Cloud: ["AWS", "Docker", "Kubernetes"],
    "AI/ML": ["TensorFlow", "LangChain", "LlamaIndex", "MLflow", "LangGraph"],
    LLMs: ["OpenAI", "Anthropic", "HuggingFace", "LLaMA", "Mistral"],
    Databases: ["MongoDB", "PostgreSQL"],
    "Vector Stores": ["Pinecone", "Weaviate", "Chroma"],
    "Graph Database": ["Neo4j"],
    "AI Tools": ["AutoGen", "CrewAI", "Agent Frameworks"]
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">⌛️ Technical Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(expertise).map(([category, skills]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-lg font-semibold">{category}</h3>
            <p className="text-gray-700 dark:text-gray-300">{skills.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 