// src/pages/Auth/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next'; // Keep commented for now if not translating this page

// Icons for password visibility (can be moved to a separate icons utility file)
const EyeIconOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
);

const EyeIconClosed = () => (
    <svg xmlns="https://static.vecteezy.com/system/resources/thumbnails/004/572/128/small/invoice-line-icon-logo-illustration-free-vector.jpg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
    </svg>
);

// Simple Logo/Brand Element (Can be shared with SignupPage if moved to components/common)
const AppLogo = ({ appName }) => {
    return (
        <div className="flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="font-heading text-3xl sm:text-4xl text-primary">{appName}</span>
        </div>
    );
};


const LoginPage = () => {
    // const { t, i18n } = useTranslation(); // For when you add translations
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        document.title = "Login - Vipatra Billing Pro";
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = { email, password };
        console.log("Login Data:", loginData);
        alert("Login attempt (check console)! In a real app, you'd call an API and navigate on success.");
        navigate('/dashboard');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-background to-primary/5"> {/* Subtle gradient background */}
            <div className="text-center mb-8 sm:mb-10 max-w-md"> {/* max-w-md for consistency with form card */}
                <AppLogo appName="Vipatra Billing Pro" />
                <p className="font-sans text-secondary mt-2 text-md sm:text-lg">Welcome back! Please log in to your account.</p>
            </div>

            <div className="bg-cardBg p-8 sm:p-10 rounded-xl shadow-lg border border-borderLight w-full max-w-md"> {/* Consistent card styling */}
                <h2 className="font-heading text-2xl text-primary mb-8 text-center">Member Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5 font-sans">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="form-element"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="passwordInput" className="block text-sm font-medium text-primary font-sans">Password</label>
                            <Link to="/forgot-password" className="text-xs font-medium text-secondary hover:text-accent transition-colors duration-200">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="passwordInput"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your secure password"
                                className="form-element pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-secondary hover:text-primary focus:outline-none"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeIconClosed /> : <EyeIconOpen />}
                            </button>
                        </div>
                    </div>

                    {/* Log In Button */}
                    <div className="pt-4"> {/* Increased top padding */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center font-sans font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 bg-primary hover:bg-primary-dark text-textOnPrimary focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
                        >
                            <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                            Log In
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-secondary font-sans">
                    Don't have an account?
                    <Link to="/signup" className="font-semibold text-primary hover:text-accent transition-colors duration-200 ml-1">
                        Sign up here
                    </Link>
                </p>
            </div>

            <footer className="mt-12 text-center text-xs text-secondary font-sans">
                © {currentYear} Vipatra Billing Pro. All rights reserved.
            </footer>
        </div>
    );
};

export default LoginPage;