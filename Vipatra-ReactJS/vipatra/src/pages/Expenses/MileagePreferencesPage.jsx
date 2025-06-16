// src/pages/Expenses/MileagePreferencesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// A functional placeholder for your MileagePreferencesComponent.
// It includes a basic form to match the context of the page.
const MileagePreferencesComponent = ({ t, onSave, onCancel }) => {
    const [rate, setRate] = useState('0.58');
    const [unit, setUnit] = useState('km');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ rate, unit });
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-heading text-primary mb-2">
                {t('expenses.mileage.preferencesTitle', 'Mileage Preferences')}
            </h2>
            <p className="text-secondary font-sans mb-6">
                {t('expenses.mileage.preferencesSubtitle', 'Set your default mileage rate and distance unit for tracking travel expenses.')}
            </p>
            <form onSubmit={handleSubmit} className="dashboard-card space-y-6">
                <div>
                    <label htmlFor="mileageRate" className="block text-sm font-medium text-primary mb-1">
                        {t('expenses.mileage.defaultRateLabel', 'Default Rate per Unit Distance')}
                    </label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            id="mileageRate"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="form-element rounded-r-none"
                            step="0.01"
                            placeholder="e.g., 0.58"
                        />
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-borderDefault bg-background text-secondary text-sm">
                            {/* Assuming you have a currency setting, otherwise hardcode */}
                            {`USD / ${unit}`}
                        </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="distanceUnit" className="block text-sm font-medium text-primary mb-1">
                        {t('expenses.mileage.distanceUnitLabel', 'Distance Unit')}
                    </label>
                    <select
                        id="distanceUnit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="form-element"
                    >
                        <option value="km">{t('expenses.mileage.units.km', 'Kilometers (km)')}</option>
                        <option value="mi">{t('expenses.mileage.units.mi', 'Miles (mi)')}</option>
                    </select>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-borderLight">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="font-sans bg-background hover:bg-borderLight text-primary px-5 py-2.5 rounded-lg border border-borderDefault"
                    >
                        {t('common.cancel', 'Cancel')}
                    </button>
                    <button
                        type="submit"
                        className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-5 py-2.5 rounded-lg shadow-md"
                    >
                        {t('common.savePreferences', 'Save Preferences')}
                    </button>
                </div>
            </form>
        </div>
    );
};

const MileagePreferencesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSavePrefs = (data) => {
        console.log("Saving Mileage Preferences:", data);
        alert(t('common.preferencesSaved', 'Preferences Saved!'));
        navigate('/expenses/new'); // Navigate back to the create page
    };

    return (
        <main className="p-6 sm:p-8">
             <MileagePreferencesComponent 
                t={t} 
                onSave={handleSavePrefs} 
                onCancel={() => navigate('/expenses/new')} 
            />
        </main>
    );
};

export default MileagePreferencesPage;