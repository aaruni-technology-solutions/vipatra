// src/pages/Estimates/EstimatesPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <--- Make sure to import useNavigate
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import ActionHeader from '../../components/layout/ActionHeader';

const EstimatesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate(); // <-- Initialize the navigate hook

    // Dummy data for the list of estimates
    const initialEstimates = [
        { id: 1, quoteNo: "QT-00001", customerName: "Sunshine Corp", quoteDate: "2023-10-25", status: "Sent", grandTotal: "15000.00" },
        { id: 2, quoteNo: "QT-00002", customerName: "BlueWave Tech", quoteDate: "2023-10-22", status: "Draft", grandTotal: "8500.50" },
    ];
    
    const [estimates, setEstimates] = useState(initialEstimates);

    // This function will be called by the ActionHeader's "New" button
    const handleNewEstimateClick = () => {
        // Navigate to your existing create page
        navigate('/quotes/new'); 
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    {/* The ActionHeader now triggers navigation */}
                    <ActionHeader
                        title={t('estimates.allEstimatesTitle', 'All Estimates')}
                        onNewClick={handleNewEstimateClick}
                    />
                    
                    {/* The list of estimates, always visible on this page */}
                    <div className="dashboard-card">
                        {estimates.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm font-sans">
                                    <thead className="bg-background border-b border-borderDefault">
                                        <tr>
                                            <th className="p-3 text-left font-semibold text-primary">Date</th>
                                            <th className="p-3 text-left font-semibold text-primary">Estimate #</th>
                                            <th className="p-3 text-left font-semibold text-primary">Customer Name</th>
                                            <th className="p-3 text-center font-semibold text-primary">Status</th>
                                            <th className="p-3 text-right font-semibold text-primary">Amount</th>
                                            <th className="p-3 text-center font-semibold text-primary">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {estimates.map(est => (
                                            <tr key={est.id} className="border-b border-borderLight hover:bg-background/50">
                                                <td className="p-3 text-secondary">{est.quoteDate}</td>
                                                <td className="p-3"><Link to={`/estimates/${est.id}`} className="text-primary font-medium hover:text-accent hover:underline">{est.quoteNo}</Link></td>
                                                <td className="p-3 text-secondary">{est.customerName}</td>
                                                <td className="p-3 text-center">
                                                    <span className={`status-badge ${est.status === 'Sent' ? 'status-active' : 'status-draft'}`}>
                                                        {t(`status.${est.status.toLowerCase()}`, est.status)}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-right text-primary font-semibold">₹{est.grandTotal}</td>
                                                <td className="p-3 text-center">
                                                    <button className="table-action-btn" title={t('actions.edit')}>
                                                        <svg viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <h3 className="text-xl font-heading text-primary mb-2">{t('estimates.noEstimatesTitle', 'No Estimates Yet')}</h3>
                                <p className="text-secondary font-sans mb-6">{t('estimates.noEstimatesSubtitle', 'Create your first estimate by clicking the "New" button above.')}</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default EstimatesPage;