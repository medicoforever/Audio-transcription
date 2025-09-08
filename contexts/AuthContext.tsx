import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initializeGeminiClient, clearGeminiClient } from '../services/geminiClient';
import { firebaseConfig } from '../services/firebaseConfig'; // Placeholder for your config

// A placeholder for the Google User object
export interface GoogleUser {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
}

interface AuthContextType {
    user: GoogleUser | null;
    apiKey: string | null;
    isLoading: boolean;
    login: (token: any, key: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A placeholder for the Google client library
declare global {
    interface Window {
        google: any;
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<GoogleUser | null>(null);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session on initial load
        try {
            const storedUser = localStorage.getItem('googleUser');
            const storedApiKey = localStorage.getItem('geminiApiKey');

            if (storedUser && storedApiKey) {
                const parsedUser: GoogleUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setApiKey(storedApiKey);
                initializeGeminiClient(storedApiKey);
            }
        } catch (error) {
            console.error("Failed to load session from storage", error);
            localStorage.removeItem('googleUser');
            localStorage.removeItem('geminiApiKey');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback((token: any, key: string) => {
        // In a real app with Firebase, you would use the token to sign in with Firebase Auth.
        // Here, we'll just decode it for basic user info.
        const decodedToken = JSON.parse(atob(token.credential.split('.')[1]));
        const googleUser: GoogleUser = {
            id: decodedToken.sub, // 'sub' is the user's unique Google ID
            name: decodedToken.name,
            email: decodedToken.email,
            imageUrl: decodedToken.picture,
        };
        
        try {
            initializeGeminiClient(key);
            setUser(googleUser);
            setApiKey(key);
            localStorage.setItem('googleUser', JSON.stringify(googleUser));
            localStorage.setItem('geminiApiKey', key);
        } catch (error) {
            alert("Failed to initialize with API key. Please check the key and try again.");
            console.error(error);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setApiKey(null);
        clearGeminiClient();
        localStorage.removeItem('googleUser');
        localStorage.removeItem('geminiApiKey');
        
        // With Firebase, you would also call `signOut(auth)`.
        
        // We reload the page to ensure all application state is cleared.
        window.location.reload();
    }, []);

    if (isLoading) {
        // A simple loading indicator while we check for a saved session.
        return (
             <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans">
                <p className="text-slate-600">Initializing session...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, apiKey, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
