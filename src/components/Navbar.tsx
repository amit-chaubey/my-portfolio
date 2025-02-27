import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-white p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/posts" className="text-gray-600 hover:text-gray-900">
              Posts
            </Link>
            <Link href="/tags" className="text-gray-600 hover:text-gray-900">
              Tags
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About Me
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-gray-900">
              Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 