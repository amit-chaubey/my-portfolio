export function Education() {
  const education = [
    {
      degree: "Master of Science (MSc) in Artificial Intelligence",
      institution: "University of Liverpool, UK",
      achievements: [
        "Graduated with Distinction",
        "Focus areas: Machine Learning, Natural Language Processing, Applied AI",
        "Reinforcement learning, Bio-Inspired Algorithms, Advance Mathematics for AI",
        "Databases, Python"
      ]
    },
    {
      degree: "Bachelor of Technology (B.Tech)",
      institution: "SRM Institute of Science and Technology, Chennai",
      achievements: [
        "First Class with Honours",
        "Major: Electronics Engineering"
      ]
    }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <img src="/icons/education.gif" alt="Education" className="inline w-8 h-8" />
        Education
      </h2>
      <div className="space-y-8">
        {education.map((edu, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-xl font-semibold">{edu.degree}</h3>
            <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {edu.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}