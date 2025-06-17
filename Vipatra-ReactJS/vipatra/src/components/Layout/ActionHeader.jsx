import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// --- SVG Icons (Heroicons) ---
// We define them here for clarity and reusability.
const IconSort = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-secondary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-4.5L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
);
const IconImport = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-secondary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9A2.25 2.25 0 0021 19.5v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);
const IconExport = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-secondary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9A2.25 2.25 0 0021 19.5v-9a2.25 2.25 0 00-2.25-2.25H15M12 9l3 3m0 0l3-3m-3 3V2.25" />
    </svg>
);
const IconPreferences = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-secondary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.242 1.453l-1.005.827c-.297.243-.398.646-.258.975a6.4 6.4 0 010 1.95c-.14.329-.533.474-.831.229l-1.005-.827a1.125 1.125 0 01-.242-1.453L16.5 7.429a1.125 1.125 0 01-1.37-.49l-1.217.456c-.355.133-.75.072-1.076-.124a6.57 6.57 0 01-.22-.127c-.332-.183-.582-.495-.644-.869l-.213-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const IconRefresh = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-secondary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001a.75.75 0 01.727.727l.002.002v4.992a.75.75 0 01-1.5 0v-2.813a8.96 8.96 0 01-15.554 0A8.96 8.96 0 018.023 3.348v2.813a.75.75 0 01-1.5 0V1.162a.75.75 0 01.727-.727l.002-.002h4.992a.75.75 0 010 1.5H4.535A7.46 7.46 0 001.5 9.348a7.46 7.46 0 0013.023 4.348 7.46 7.46 0 001.481-8.349z" />
    </svg>
);
const IconResetWidth = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-secondary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
);


const ActionHeader = ({ title, onNewClick }) => {
    const { t } = useTranslation();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dropdownItems = [
        { label: 'actions.sortBy', icon: <IconSort />, hasSubmenu: true },
        { label: 'actions.import', icon: <IconImport />, description: 'From CSV file' },
        { label: 'actions.export', icon: <IconExport />, description: 'To CSV file', hasSubmenu: true },
        { type: 'divider' },
        { label: 'actions.preferences', icon: <IconPreferences /> },
        { label: 'actions.refreshList', icon: <IconRefresh /> },
        { label: 'actions.resetColumnWidth', icon: <IconResetWidth /> },
    ];

    return (
        // KEY FIX:
        // - `sticky top-0`: Makes the entire header stick to the top.
        // - `z-40`: High z-index to appear over all other page content (like table headers with z-30).
        // - `bg-white`: A solid background is crucial for sticky elements to hide content scrolling underneath.
        <header className="sticky top-0 z-40 flex items-center justify-between p-4 bg-white border-b border-borderDefault">
            <h1 className="text-xl font-bold text-primary">{title}</h1>
            <div className="flex items-center space-x-2">
               <button
                    onClick={onNewClick}
                    // THEME CHANGE: Replaced green with your primary theme color.
                    // Using `hover:bg-primary/90` creates a slightly darker hover effect automatically.
                    className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    {t('actions.new', 'New')}
                </button>

                {/* Dropdown Menu Section */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className="p-2 rounded-md hover:bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        {/* More options icon */}
                        <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        // This dropdown is `position: absolute`, its stacking order is controlled by its parent header.
                        <div className="absolute right-0 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {dropdownItems.map((item, index) => {
                                    if (item.type === 'divider') {
                                        return <div key={index} className="border-t border-borderLight my-1"></div>;
                                    }
                                    return (
                                        <a key={index} href="#" className="flex items-center justify-between w-full px-4 py-2 text-left text-sm text-primary hover:bg-background hover:text-accent">
                                            <div className="flex items-center">
                                                {item.icon}
                                                <div>
                                                    <p className="font-medium">{t(item.label, item.label.split('.').pop())}</p>
                                                    {item.description && <p className="text-xs text-secondary">{t(item.description)}</p>}
                                                </div>
                                            </div>
                                            {item.hasSubmenu && (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-secondary">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                </svg>
                                            )}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <button className="p-2 bg-yellow-400 text-yellow-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">?</button>
            </div>
        </header>
    );
};

export default ActionHeader;