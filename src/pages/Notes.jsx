import React from 'react';
import { Link } from 'react-router-dom';

const Notes = () => {
  const resources = [
    {
      title: "DSA PDFs & Sheets",
      description: "DSA question sheets, handwritten notes, and topic-wise questions",
      link: "/dsa-pdf-notes",
      emoji: "📚"
    },
    {
      title: "C++ STL Learning",
      description: "Essential C++ STL concepts and libraries",
      link: "/cpp-stl-notes",
      emoji: "💻"
    },
    {
      title: "SQL Learning",
      description: "SQL queries, concepts, and practice resources",
      link: "/sql-notes",
      emoji: "🗄️"
    },
    {
      title: "System Design",
      description: "System design concepts and interview preparation",
      link: "/system-design-notes",
      emoji: "🏗️"
    },
    {
      title: "Core Subjects",
      description: "OS, DBMS, CN, and other core computer science subjects",
      link: "/core-subjects-notes",
      emoji: "📖"
    },
    {
      title: "Web Development",
      description: "Frontend, backend, and full-stack web development resources",
      link: "/webdev-notes",
      emoji: "🌐"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Learning Resources
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        Explore curated learning materials, notes, and resources for interview preparation and skill development
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {resources.map((resource) => (
          <Link
            key={resource.link}
            to={resource.link}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="text-4xl mb-4">{resource.emoji}</div>
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {resource.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {resource.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-primary-500 text-base font-semibold">
          More resources coming soon. Stay curious and keep learning!
        </p>
        <p className="mt-2 text-gray-500 text-sm">
          I'm also a learner—let's keep growing together!
        </p>
      </div>
    </div>
  );
};

export default Notes;
