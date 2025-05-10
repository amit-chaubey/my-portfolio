export function CurrentFocus() {
  const focuses = [
    "Building scalable web applications using modern frameworks",
    "Implementing AI/ML solutions in web applications",
    "Developing cloud-native applications",
    "Creating technical content and documentation",
    "Building autonomous AI agents",
    "Optimizing GenAI workflows for enterprise applications"
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <img src="/icons/focus.gif" alt="Current Focus" className="inline w-8 h-8" />
        Current Focus
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        {focuses.map((focus, index) => (
          <li key={index}>{focus}</li>
        ))}
      </ul>
    </section>
  );
} 