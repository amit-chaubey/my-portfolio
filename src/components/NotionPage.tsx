'use client';

interface NotionPageProps {
  pageId: string;
  title: string;
  date: string;
}

export default function NotionPage({ pageId, title, date }: NotionPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="text-gray-600 mb-8">{date}</div>
      <div className="notion-content h-screen">
        <iframe
          src={`https://pointed-name-caa.notion.site/${pageId}`}
          className="w-full h-full border-0"
          allow="clipboard-write"
        />
      </div>
    </div>
  );
} 