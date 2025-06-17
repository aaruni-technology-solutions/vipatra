// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Assuming you use React Router
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher'; // Import the switcher

const Header = () => {
  const { t } = useTranslation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false); // State for notification panel

  const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);
  const toggleNotificationPanel = () => setNotificationPanelOpen(!notificationPanelOpen);


  // Close dropdown if clicked outside - basic implementation
  // For robust solution, consider a custom hook or library
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }
      if (notificationPanelOpen && !event.target.closest('.notification-panel-container')) {
        setNotificationPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDropdownOpen, notificationPanelOpen]);


  return (
    <header className="bg-primary text-textOnPrimary p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center">
        <h1 className="text-2xl font-heading">{t('appTitle', 'Vipatra')}</h1> {/* Example translation */}
      </div>
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-4 font-sans">
          {/* Use NavLink for active class styling with React Router */}
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>{t('nav.dashboard', 'Dashboard')}</NavLink>
          <NavLink to="/invoices" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>{t('nav.billing', 'Billing')}</NavLink>
          <NavLink to="/inventory" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>{t('nav.inventory', 'Inventory')}</NavLink>
         
          
          <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>{t('nav.settings', 'Settings')}</NavLink>
          <NavLink to="/support" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>{t('nav.support', 'Support')}</NavLink>
        </nav>

        <LanguageSwitcher /> {/* ADDED LANGUAGE SWITCHER */}

        {/* Notification Icon & Panel */}
        <div className="relative notification-panel-container">
            <button
                type="button"
                onClick={toggleNotificationPanel}
                className="p-2 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-accent transition-colors duration-150"
                aria-label={t('viewNotifications', 'View notifications')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-danger-DEFAULT ring-2 ring-primary">
                    <span className="sr-only">{t('newNotifications', 'New notifications')}</span>
                </span>
            </button>
            {notificationPanelOpen && (
                <div id="notificationPanel" className="absolute right-0 mt-2 w-80 bg-cardBg rounded-lg shadow-lg py-1 border border-borderLight z-20">
                    <div className="p-3 border-b border-borderLight">
                        <h4 className="text-sm font-semibold text-primary">{t('notifications', 'Notifications')}</h4>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {/* Example Notifications (Replace with dynamic data) */}
                        <a href="#" className="block px-4 py-3 text-sm text-secondary hover:bg-background">
                            <p className="font-medium text-primary">{t('notification.invoiceDue', 'Invoice #INV-001 due soon')}</p>
                            <p className="text-xs">{t('time.hoursAgo', '{{count}} hours ago', { count: 2 })}</p>
                        </a>
                        <a href="#" className="block px-4 py-3 text-sm text-secondary hover:bg-background border-t border-borderLight">
                            <p className="font-medium text-primary">{t('notification.paymentReceived', 'Payment of ₹500 received')}</p>
                            <p className="text-xs">{t('time.yesterday', 'Yesterday')}</p>
                        </a>
                    </div>
                    <div className="p-2 border-t border-borderLight text-center">
                        <a href="#" className="text-sm font-medium text-primary hover:text-accent">{t('viewAllNotifications', 'View all notifications')}</a>
                    </div>
                </div>
            )}
        </div>


        {/* Profile Dropdown */}
        <div className="relative font-sans profile-dropdown-container">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center space-x-2 hover:bg-primary-dark p-2 rounded-lg transition-colors duration-150"
          >
            <img src="https://i.pinimg.com/736x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg" alt="Admin" className="w-8 h-8 rounded-full border-2 border-accent" />
            <span className="hidden lg:inline text-sm">{t('user.administrator', 'Administrator')}</span>
            <svg className="w-4 h-4 text-accent hidden lg:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {profileDropdownOpen && (
            <div id="profileDropdown" className="absolute right-0 mt-2 w-48 bg-cardBg rounded-lg shadow-soft py-1 border border-borderLight z-20">
              <Link to="/profile" className="block px-4 py-2 text-sm text-primary hover:bg-background">{t('profile.myProfile', 'My Profile')}</Link>
              <Link to="/settings/account" className="block px-4 py-2 text-sm text-primary hover:bg-background">{t('profile.accountSettings', 'Account Settings')}</Link>
              <hr className="my-1 border-borderLight" />
              <Link to="/logout" className="block px-4 py-2 text-sm text-danger-dark hover:bg-danger-light">{t('profile.logout', 'Logout')}</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;