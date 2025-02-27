import React from 'react';
import { ResourceCard, ResourceProps } from './ResourceCard';

interface ResourceTrackProps {
  title: string;
  description: string;
  resources: ResourceProps[];
}

export function ResourceTrack({ title, description, resources }: ResourceTrackProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </section>
  );
} 