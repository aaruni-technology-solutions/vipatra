// src/pages/Auth/SignupPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Icons for password visibility
const EyeIconOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
);
const EyeIconClosed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
    </svg>
);

// Simple Logo/Brand Element
const AppLogo = ({ appNameKey }) => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center justify-center mb-6">
            {/* You can replace this with an actual SVG logo later */}
            <svg className="w-10 h-10 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="font-heading text-3xl sm:text-4xl text-primary">{t(appNameKey, 'Vipatra')}</span>
        </div>
    );
};


const SignupPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        document.title = t('signupPage.title', 'Sign Up - Vipatra Billing Pro');
    }, [t, i18n.language]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert(t('alerts.passwordsDoNotMatch', "Passwords do not match!"));
            return;
        }
        const signupData = { fullName, email, password, role };
        console.log("Signup Data:", signupData);
        alert(t('alerts.signupSuccessful', "Signup successful (check console)!"));
        // navigate('/login'); // Or to a confirmation page
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const roles = [
        { value: 'admin', labelKey: 'signupPage.roles.admin' },
        { value: 'billing_staff', labelKey: 'signupPage.roles.billing_staff' },
        { value: 'inventory_manager', labelKey: 'signupPage.roles.inventory_manager' },
        { value: 'patient_customer', labelKey: 'signupPage.roles.patient_customer' },
        { value: 'vendor_distributor', labelKey: 'signupPage.roles.vendor_distributor' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-background to-primary/5"> {/* Subtle gradient background */}
            <div className="text-center mb-8 sm:mb-10 max-w-xl">
                <AppLogo appNameKey="signupPage.header" /> {/* Using the new Logo component */}
                <p className="font-sans text-secondary mt-2 text-md sm:text-lg">{t('signupPage.subtitle')}</p>
            </div>

            {/* Increased shadow, subtle border */}
            <div className="bg-cardBg p-8 sm:p-10 rounded-xl shadow-lg border border-borderLight w-full max-w-lg">
                <h2 className="font-heading text-2xl text-primary mb-8 text-center">{t('signupPage.formTitle')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('signupPage.fullNameLabel')}</label>
                        <input type="text" name="fullname" id="fullname" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={t('signupPage.fullNamePlaceholder')} className="form-element" />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('signupPage.emailLabel')}</label>
                        <input type="email" name="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('signupPage.emailPlaceholder')} className="form-element" />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="passwordInput" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('signupPage.passwordLabel')}</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="passwordInput"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('signupPage.passwordPlaceholder')}
                                className="form-element pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-secondary hover:text-primary focus:outline-none"
                                aria-label={t('signupPage.togglePasswordVisibility')}
                            >
                                {showPassword ? <EyeIconClosed /> : <EyeIconOpen />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('signupPage.confirmPasswordLabel')}</label>
                        <input type="password" name="confirm-password" id="confirm-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t('signupPage.confirmPasswordPlaceholder')} className="form-element" />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('signupPage.roleLabel')}</label>
                        <div className="relative">
                            <select id="role" name="role" required value={role} onChange={(e) => setRole(e.target.value)} className="form-element appearance-none">
                                <option value="" disabled className="text-secondary">{t('signupPage.chooseRoleOption')}</option>
                                {roles.map(r => (
                                    <option key={r.value} value={r.value}>{t(r.labelKey)}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-secondary">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* Create Account Button */}
                    <div className="pt-4"> {/* Increased top padding */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center font-sans font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 bg-primary hover:bg-primary-dark text-textOnPrimary focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
                        >
                            <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                            {t('signupPage.createAccountBtn')}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-secondary font-sans">
                    {t('signupPage.alreadyHaveAccount')}
                    <Link to="/login" className="font-semibold text-primary hover:text-accent transition-colors duration-200 ml-1">
                        {t('signupPage.loginHereLink')}
                    </Link>
                </p>
            </div>

            <footer className="mt-12 text-center text-xs text-secondary font-sans">
                {t('signupPage.footerText', { year: currentYear })}
            </footer>
        </div>
    );
};

export default SignupPage;