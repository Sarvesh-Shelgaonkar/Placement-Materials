import { useState, useEffect } from 'react';

// Local storage based progress hook for faster performance
export const useLocalProgress = () => {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('dsa-progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem('dsa-progress', JSON.stringify(newProgress));
  };

  const markProblemSolved = (problemId) => {
    const newProgress = {
      ...progress,
      [problemId]: { solved: true, solvedAt: new Date().toISOString() }
    };
    saveProgress(newProgress);
  };

  const markProblemUnsolved = (problemId) => {
    const newProgress = { ...progress };
    delete newProgress[problemId];
    saveProgress(newProgress);
  };

  const getProgress = (problemId) => {
    return progress[problemId] || { solved: false };
  };

  const getTotalSolved = () => {
    return Object.keys(progress).length;
  };

  const getTopicProgress = (topicProblems) => {
    const solved = topicProblems.filter(problem => progress[problem.id]?.solved).length;
    return {
      solved,
      total: topicProblems.length,
      percentage: topicProblems.length > 0 ? Math.round((solved / topicProblems.length) * 100) : 0
    };
  };

  return {
    progress,
    loading,
    markProblemSolved,
    markProblemUnsolved,
    getProgress,
    getTotalSolved,
    getTopicProgress
  };
};