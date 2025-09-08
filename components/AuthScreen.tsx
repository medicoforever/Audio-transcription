import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { firebaseConfig } from '../services/firebaseConfig'; // Placeholder for your config

const AuthScreen: React.FC = () => {
    const { login } = useAuth();
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState<string | null>(null);
    const googleButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.google && googleButtonRef.current) {
            window.google.accounts.id.initialize({
                // IMPORTANT: Replace this with your actual Google Client ID from the Firebase setup guide.
                client_id: firebaseConfig.googleClientId,
                callback: (response: any) => {
                    if (!apiKey.trim()) {
                        setError("Please enter your Gemini API key before signing in.");
                        return;
                    }
                    setError(null);
                    login(response, apiKey.trim());
                }
            });
            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                { theme: "outline", size: "large", text: "signin_with", width: "300" } 
            );
        }
    }, [apiKey, login]);

    const handleManualLogin = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Please use the 'Sign in with Google' button to continue.");
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Welcome</h1>
                    <p className="text-slate-600 mt-2">Sign in and provide your Gemini API key to continue.</p>
                </div>

                <form onSubmit={handleManualLogin} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="api-key" className="block text-sm font-medium text-slate-700">
                            Gemini API Key
                        </label>
                        <input
                            id="api-key"
                            name="api-key"
                            type="password"
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your API key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                         <p className="mt-2 text-xs text-slate-500">
                            Your API key is stored only in your browser's local storage.
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                       {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                       <div ref={googleButtonRef}></div>
                        <p className="mt-4 text-xs text-slate-500">
                           You must provide an API key above before signing in.
                        </p>
                    </div>
                </form>

                 <div className="mt-8 text-center text-sm text-slate-500">
                    <p>Don't have an API key? Get one from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">Google AI Studio</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
