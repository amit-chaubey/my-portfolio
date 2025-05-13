import { useState } from 'react';
import { FiDownload, FiMessageSquare, FiX } from 'react-icons/fi';

interface PaperViewerProps {
  paper: {
    id: string;
    title: string;
    authors: string[];
    abstract: string;
    pdfUrl?: string;
    localPdfPath?: string;
    previewUrl: string;
  };
  onClose: () => void;
}

export default function PaperViewer({ paper, onClose }: PaperViewerProps) {
  const [activeTab, setActiveTab] = useState<'view' | 'discussion'>('view');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; text: string; author: string; timestamp: string }>>([
    {
      id: '1',
      text: 'This paper introduced groundbreaking concepts in transformer architecture.',
      author: 'John Doe',
      timestamp: '2024-03-15T10:30:00Z'
    }
  ]);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      text: comment,
      author: 'Anonymous', // In a real app, this would be the logged-in user
      timestamp: new Date().toISOString()
    };
    
    setComments([...comments, newComment]);
    setComment('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold">{paper.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b dark:border-gray-700">
          <button
            className={`px-4 py-2 ${activeTab === 'view' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            View Paper
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'discussion' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('discussion')}
          >
            Discussion
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'view' ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FiDownload /> Download PDF
                  </a>
                )}
                {paper.localPdfPath && (
                  <a
                    href={paper.localPdfPath}
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <FiDownload /> Local Download
                  </a>
                )}
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3>Authors</h3>
                <p>{paper.authors.join(', ')}</p>

                <h3>Abstract</h3>
                <p>{paper.abstract}</p>

                <div className="mt-8">
                  {paper.localPdfPath ? (
                    <iframe
                      src={paper.localPdfPath}
                      className="w-full h-[60vh] border rounded"
                      title="Paper PDF"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      PDF preview not available. Please download the paper.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your comment..."
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                >
                  <FiMessageSquare /> Add Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 