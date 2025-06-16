// src/pages/Expenses/MileagePreferencesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';

// The MileagePreferences component from your original file
const MileagePreferencesComponent = ({ t, onSave, onCancel }) => { /* ... No changes needed ... */ };

const MileagePreferencesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSavePrefs = (data) => {
        console.log("Saving Mileage Preferences:", data);
        alert(t('common.preferencesSaved', 'Preferences Saved!'));
        navigate('/expenses/new'); // Navigate back to the create page
    };

    return (
         <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                     <MileagePreferencesComponent 
                        t={t} 
                        onSave={handleSavePrefs} 
                        onCancel={() => navigate('/expenses/new')} 
                    />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MileagePreferencesPage;