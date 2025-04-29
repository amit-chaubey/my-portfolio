import Link from 'next/link';
import '@/styles/typography.css';

interface Resource {
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  tags: string[];
  link: string;
}

interface ResourceTrackProps {
  title: string;
  description: string;
  resources: Resource[];
}

export function ResourceTrack({ title, description, resources }: ResourceTrackProps) {
  return (
    <div className="content-spacing">
      <div className="content-spacing">
        <h2 className="heading-2">{title}</h2>
        <p className="body-large text-secondary">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Link 
            key={index}
            href={resource.link}
            className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <article className="content-spacing">
              <div>
                <h3 className="heading-4 mb-2">{resource.title}</h3>
                <p className="body-base text-secondary">{resource.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="body-small px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  {resource.difficulty}
                </span>
                <span className="body-small px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                  {resource.estimatedTime}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="body-small px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
} 