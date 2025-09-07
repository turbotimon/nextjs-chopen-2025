export default async function AboutScreen() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">About This To-Do App</h1>
      <div className="space-y-4 text-lg">
        <p className="text-gray-700">
          Welcome to our simple and efficient to-do application built with{" "}
          <a
            href="https://nextjs.org"
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
          .
        </p>
        <p className="text-gray-700">
          This application helps you organize your tasks effectively with features
          like task creation, completion tracking, and separate views for pending
          and completed tasks.
        </p>
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-left text-gray-700">
            <li>Create and manage tasks easily</li>
            <li>Track pending and completed tasks</li>
            <li>Clean and intuitive user interface</li>
            <li>Built with modern web technologies</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
