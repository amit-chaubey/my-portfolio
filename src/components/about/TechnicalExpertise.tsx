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

  // Color map for category cards
  const categoryColors: Record<string, string> = {
    Frontend: "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700",
    Backend: "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700",
    Cloud: "bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700",
    "AI/ML": "bg-purple-50 dark:bg-purple-900 border-purple-200 dark:border-purple-700",
    LLMs: "bg-pink-50 dark:bg-pink-900 border-pink-200 dark:border-pink-700",
    Databases: "bg-teal-50 dark:bg-teal-900 border-teal-200 dark:border-teal-700",
    "Vector Stores": "bg-orange-50 dark:bg-orange-900 border-orange-200 dark:border-orange-700",
    "Graph Database": "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700",
    "AI Tools": "bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700"
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <img src="/icons/techstack.gif" alt="Technical Expertise" className="inline w-8 h-8" />
        Technical Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(expertise).map(([category, skills]) => (
          <div
            key={category}
            className={`rounded-xl shadow p-4 border ${categoryColors[category] || "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"}`}
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 rounded-full px-3 py-1 text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800 hover:scale-105 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 