import { Circle, CircleCheck } from 'lucide-react';
import React, { useState } from 'react';

const EmailSignupStep1: React.FC = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Validation Logic
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumberOrSpecial = /[0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/.test(password);
    const hasMinLength = password.length >= 10;

    return (
        <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center pt-8 font-sans">
            {/* Logo */}
            <div className="mb-6">
                <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.241 1.2zM20.16 9.6C15.84 7.08 9.12 6.96 5.28 8.16c-.6.18-1.2-.12-1.38-.72-.18-.6.12-1.2.72-1.38 4.44-1.32 11.88-1.2 16.92 1.8.54.3.72 1.02.42 1.56-.24.6-.96.78-1.8.18z" />
                </svg>
            </div>

            {/* Main Container */}
            <div className="w-full max-w-[400px] px-4">
                {/* Progress Bar */}
                <div className="w-full h-0.5 bg-neutral-700 rounded-full mb-8">
                    <div className="h-full bg-[#1ed760] w-1/3 rounded-full"></div>
                </div>

                {/* Back Button & Header */}
                <div className="flex items-start mb-6">
                    <button className="mr-3 mt-1 text-neutral-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <div>
                        <span className="text-neutral-400 text-sm font-semibold block mb-1">Step 1 of 3</span>
                        <h1 className="text-2xl font-bold">Create a password</h1>
                    </div>
                </div>

                {/* Form Group */}
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#121212] border border-neutral-500 rounded p-3 text-white focus:outline-none focus:border-white transition-colors pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Validation Rules */}
                <div className="mb-8">
                    <p className="text-sm font-bold mb-3">Your password must contain at least</p>
                    <ul className="space-y-2 text-sm font-medium">
                        <ValidationItem isValid={hasLetter} text="1 letter" />
                        <ValidationItem isValid={hasNumberOrSpecial} text="1 number or special character (example: # ? ! &)" />
                        <ValidationItem isValid={hasMinLength} text="10 characters" />
                    </ul>
                </div>

                {/* Next Button */}
                <button
                    className="w-full bg-[#1ed760] hover:bg-[#3be477] text-black font-bold py-3.5 rounded-full transition-transform hover:scale-105"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const ValidationItem: React.FC<{ isValid: boolean; text: string }> = ({ isValid, text }) => {
    return (
        <li className={`flex items-start gap-2 ${isValid ? 'text-white' : 'text-neutral-400'}`}>
            <span className="mt-0.5 shrink-0">
                {isValid ? (
                    <CircleCheck size={22} color="#1DB954" />
                ) : (
                    <Circle size={22} />
                )}
            </span>
            <span>{text}</span>
        </li>
    );
};

export default EmailSignupStep1;