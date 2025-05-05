export default function Footer() {
    return (
      <footer className="py-6 border-t dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Amit Choubey. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  