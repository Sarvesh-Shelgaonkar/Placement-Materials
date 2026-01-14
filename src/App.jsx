import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notes from './pages/Notes';
import CppStlNotes from './pages/CppStlNotes';
import DsaPdfNotes from './pages/DsaPdfNotes';
import SqlNotes from './pages/SqlNotes';
import SystemDesignNotes from './pages/SystemDesignNotes';
import './App.css';
import WebdevNotes from './pages/WebdevNotes';
import DSAProblemsPage from './pages/DSAProblemsPage';

const CoreSubjectsNotes = React.lazy(() => import('./pages/CoreSubjectsNotes'));

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
               TOP 100 DSA Problems
              </Link>
            
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  Home
                </Link>

                <Link
                  to="/notes"
                  className="text-gray-600 font-bold hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  Learning Resources
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/notes" element={<Notes />} />
              <Route path="/cpp-stl-notes" element={<CppStlNotes />} />
              <Route path="/dsa-pdf-notes" element={<DsaPdfNotes />} />
              <Route path="/sql-notes" element={<SqlNotes />} />
              <Route path="/system-design-notes" element={<SystemDesignNotes />} />
              <Route path="/core-subjects-notes" element={<CoreSubjectsNotes />} />
              <Route path="/webdev-notes" element={<WebdevNotes />} />
              <Route path="/" element={<DSAProblemsPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
