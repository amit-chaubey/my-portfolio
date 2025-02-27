'use client';

import Link from 'next/link';

export default function ReactFundamentalsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/resources" className="text-blue-600 hover:underline flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Resources
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">React Fundamentals</h1>
      
      <div className="flex gap-2 mb-6">
        <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-medium">Beginner</span>
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">4 hours</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">React</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">JavaScript</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">Frontend</span>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Introduction to React</h2>
        <p>
          React is a JavaScript library for building user interfaces, particularly single-page applications. 
          It's used for handling the view layer in web and mobile apps. React allows you to design simple 
          views for each state in your application, and it will efficiently update and render just the right 
          components when your data changes.
        </p>

        <h2>Core Concepts</h2>
        
        <h3>1. Components</h3>
        <p>
          Components are the building blocks of any React application. A component is a self-contained 
          module that renders some output. Components can be nested within other components to allow 
          complex applications to be built out of simple building blocks.
        </p>
        <pre><code className="language-jsx">{`// Function Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Class Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}`}</code></pre>

        <h3>2. Props</h3>
        <p>
          Props (short for properties) are a way of passing data from parent to child components. 
          Props are read-only and help make your components reusable.
        </p>
        <pre><code className="language-jsx">{`function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage
<Welcome name="Sara" />`}</code></pre>

        <h3>3. State</h3>
        <p>
          State is a JavaScript object that stores a component's dynamic data and determines how the 
          component renders and behaves. State is private and fully controlled by the component.
        </p>
        <pre><code className="language-jsx">{`function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}</code></pre>

        <h3>4. Hooks</h3>
        <p>
          Hooks are functions that let you "hook into" React state and lifecycle features from function 
          components. Hooks don't work inside classes — they let you use React without classes.
        </p>
        <pre><code className="language-jsx">{`// useState Hook
function Example() {
  const [count, setCount] = useState(0);
  
  // useEffect Hook
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}</code></pre>

        <h2>Practice Project</h2>
        <p>
          To solidify your understanding of React fundamentals, try building a simple todo list application 
          that incorporates components, props, state, and hooks.
        </p>

        <h2>Additional Resources</h2>
        <ul>
          <li><a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">Official React Documentation</a></li>
          <li><a href="https://beta.reactjs.org/" target="_blank" rel="noopener noreferrer">React Docs Beta (New React Docs)</a></li>
          <li><a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer">Learn React</a></li>
        </ul>
      </div>
    </div>
  );
} 