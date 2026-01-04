import React from 'react';
import Seo from './Seo';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => (
  <div className="min-h-screen pt-24 pb-20 bg-page">
    <Seo
      title="Page Not Found"
      description="The page you are looking for does not exist."
      path="/404"
      type="article"
      noIndex
    />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">Page not found.</h1>
      <p className="text-gray-400 text-lg mb-10">
        The page you are looking for does not exist. Head back to the homepage or open the documentation.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-full bg-brand-400 text-black font-semibold hover:bg-brand-500 transition-colors"
        >
          Go home
        </button>
        <button
          onClick={() => onNavigate('/documentation')}
          className="px-6 py-3 rounded-full border border-surface-200 text-white font-medium hover:bg-surface-100 transition-colors"
        >
          Documentation
        </button>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
