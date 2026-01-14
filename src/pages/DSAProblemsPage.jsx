import React, { useState, useMemo } from 'react';
import { dsaProblems } from '../data/dsaProblems';
import { useLocalProgress } from '../hooks/useLocalProgress';

const DSAProblemsPage = () => {
  const { progress, markProblemSolved, markProblemUnsolved } = useLocalProgress();
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 20;

  // Get all unique topics - memoized to avoid recalculation
  const topics = useMemo(() => ['All', ...dsaProblems.map(topic => topic.topic)], []);
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // Filter problems based on selected topic and difficulty - memoized for performance
  const filteredProblems = useMemo(() => {
    let allProblems = [];
    
    dsaProblems.forEach(topicData => {
      if (selectedTopic === 'All' || topicData.topic === selectedTopic) {
        topicData.problems.forEach(problem => {
          if (selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty) {
            allProblems.push({
              ...problem,
              topic: topicData.topic
            });
          }
        });
      }
    });
    
    return allProblems;
  }, [selectedTopic, selectedDifficulty]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
  const startIndex = (currentPage - 1) * problemsPerPage;
  const endIndex = startIndex + problemsPerPage;
  const currentProblems = filteredProblems.slice(startIndex, endIndex);

  const solvedCount = filteredProblems.filter(problem => progress[problem.id]?.solved).length;

  // Reset to page 1 when filters change
  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(1);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          DSA Problems Collection
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Solve {filteredProblems.length} carefully curated problems. 
          Progress: {solvedCount}/{filteredProblems.length} solved
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Topic
          </label>
          <select
            value={selectedTopic}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <span>{solvedCount}/{filteredProblems.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${filteredProblems.length > 0 ? (solvedCount / filteredProblems.length) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {currentProblems.map((problem, index) => {
          const globalIndex = startIndex + index;
          return (
          <div 
            key={problem.id}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              progress[problem.id]?.solved 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">
                  #{globalIndex + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {problem.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {problem.topic}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Solve →
                </a>
                
                <button
                  onClick={() => progress[problem.id]?.solved 
                    ? markProblemUnsolved(problem.id) 
                    : markProblemSolved(problem.id)
                  }
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    progress[problem.id]?.solved
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {progress[problem.id]?.solved ? '✓ Solved' : 'Mark Solved'}
                </button>
              </div>
            </div>
          </div>
        );
        })}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No problems found for the selected filters.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            ← Previous
          </button>
          
          <div className="flex items-center gap-2">
            {/* First page */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  1
                </button>
                {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
              </>
            )}

            {/* Page numbers around current page */}
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              if (pageNum >= currentPage - 2 && pageNum <= currentPage + 2) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 border rounded-md ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}

            {/* Last page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Next →
          </button>
        </div>
      )}

      {/* Showing X-Y of Z problems */}
      {filteredProblems.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProblems.length)} of {filteredProblems.length} problems
        </div>
      )}
    </div>
  );
};

export default DSAProblemsPage;