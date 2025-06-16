// src/components/layout/ActionHeader.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ActionHeader = ({ title, onNewClick }) => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // This effect handles closing the dropdown when clicking outside of it.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Icons for the dropdown menu
    const RightArrow = <svg className="w-4 h-4 ml-auto text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>;
    const SortIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>;
    const ImportIcon = <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" /></svg>;
    const ExportIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v12" /></svg>;
    const PrefsIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.213-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    const RefreshListIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l4.992-4.993m-4.993 0l-3.181 3.183a8.25 8.25 0 000 11.664l3.181 3.183" /></svg>;
    const ResetColumnIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>;

    // The bar is sticky to the top of the main content area.
    // Negative margins pull it into the padding of the parent `main` element to make it full-width.
    return (
        <div className="bg-background/95 backdrop-blur-sm sticky top-0 z-20 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 px-6 sm:px-8 py-3 border-b border-borderLight flex justify-between items-center">
            {/* Left Side */}
            <div className="flex items-center">
                <h2 className="text-xl font-heading text-primary flex items-center cursor-pointer hover:text-accent transition-colors">
                    {title}
                    <svg className="w-5 h-5 ml-1.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </h2>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2">
                 <button onClick={onNewClick} className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2 rounded-lg shadow-sm transition-colors text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span>{t('common.new', 'New')}</span>
                </button>

                <div className="relative" ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-background text-secondary hover:text-primary transition-colors">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl z-30 border border-borderDefault font-sans">
                            <ul className="py-1 text-sm text-primary">
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{SortIcon} <span>Sort by</span> {RightArrow}</li>
                                <li className="px-4 py-2.5 bg-primary/10 text-primary font-medium flex items-center cursor-pointer">{ImportIcon} <span>Import</span> {RightArrow}</li>
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{ExportIcon} <span>Export</span> {RightArrow}</li>
                                <li className="border-t border-borderLight my-1"></li>
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{PrefsIcon} <span>Preferences</span></li>
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{RefreshListIcon} <span>Refresh List</span></li>
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{ResetColumnIcon} <span>Reset Column Width</span></li>
                            </ul>
                        </div>
                    )}
                </div>

                 <button className="p-2 rounded-md bg-warning/10 text-warning hover:bg-warning/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                </button>
            </div>
        </div>
    );
};

export default ActionHeader;




  





