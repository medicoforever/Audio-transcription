
import React, { useState } from 'react';

interface ApiKeyManagerProps {
  onKeySaved: (key: string) => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeySaved }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim().length < 10) { // Basic validation
      setError('Please enter a valid Gemini API key.');
      return;
    }
    setError('');
    onKeySaved(apiKey.trim());
  };

  return (
    <div className="fixed inset-0 bg-slate-100 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Enter Your Gemini API Key</h2>
        <p className="text-slate-600 text-center mb-6">To use this application, you need to provide your own Google Gemini API key. Your key will be saved securely in your browser's local storage.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-slate-700 mb-1">API Key</label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your API key here"
              aria-label="Gemini API Key"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
          >
            Save and Continue
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4 text-center">
          Don't have a key? Get one from {' '}
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Google AI Studio
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyManager;
