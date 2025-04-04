import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  liveUrl?: string;
  comingSoon?: boolean;
  codeUrl?: string;
  technologies: string[];
  gradientFrom?: string;
  gradientTo?: string;
}

const projects: Project[] = [
  {
    title: "Movie Recommendation System",
    description: "A Python-based recommendation engine that suggests movies based on user preferences using collaborative filtering and machine learning algorithms.",
    comingSoon: true,
    codeUrl: "https://github.com/amit-chaubey/recommendation-system",
    technologies: ["Python", "Pandas", "scikit-learn", "Streamlit"],
    gradientFrom: "from-indigo-500",
    gradientTo: "to-purple-600"
  },
  {
    title: "Modern Todo App",
    description: "A beautifully designed Todo app that showcases fundamental programming paradigms. Building a Todo application demonstrates core principles of state management, user interactions, and data persistence that are essential for any developer to master.",
    liveUrl: "https://amit-mytodoapp.netlify.app/",
    codeUrl: "https://github.com/amit-chaubey/to-do-app",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Local Storage"],
    gradientFrom: "from-emerald-400",
    gradientTo: "to-cyan-500"
  }
];

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <p className="text-base mb-6">Here are some of the projects I've worked on. More will be added soon!</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className={`h-20 bg-gradient-to-r ${project.gradientFrom || 'from-blue-500'} ${project.gradientTo || 'to-purple-600'} flex items-center justify-center p-4`}>
              <h2 className="text-xl font-bold text-white">{project.title}</h2>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
              
              {project.title === "Modern Todo App" && (
                <div className="mb-4 grid grid-cols-2 gap-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-emerald-500">✨</span>
                    <span className="text-xs">Clean, modern UI</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-emerald-500">📱</span>
                    <span className="text-xs">Fully responsive</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-emerald-500">✅</span>
                    <span className="text-xs">Task management</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-emerald-500">🔍</span>
                    <span className="text-xs">Task filtering</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-emerald-500">💾</span>
                    <span className="text-xs">Local storage</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-emerald-500">🌓</span>
                    <span className="text-xs">Glass-morphism UI</span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                {project.comingSoon ? (
                  <span className="px-3 py-1.5 text-xs bg-blue-400 opacity-70 text-white rounded-md flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Demo (Coming Soon)
                  </span>
                ) : project.liveUrl ? (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                ) : null}
                
                {project.codeUrl && (
                  <a 
                    href={project.codeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 