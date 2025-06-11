// src/pages/Reports/ReportsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar'; 
import Footer from '../../components/layout/Footer';

// Define report categories with their details and icons
const reportCategories = [
    { id: 'salesReports', titleKey: 'reports.categories.sales.title', descriptionKey: 'reports.categories.sales.description', icon: <svg className="w-8 h-8 mb-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg> },
    { id: 'paymentStatusReports', titleKey: 'reports.categories.paymentStatus.title', descriptionKey: 'reports.categories.paymentStatus.description', icon: <svg className="w-8 h-8 mb-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> },
    { id: 'taxLiabilityReports', titleKey: 'reports.categories.taxLiability.title', descriptionKey: 'reports.categories.taxLiability.description', icon: <svg className="w-8 h-8 mb-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg> },
    { id: 'customerAgingReports', titleKey: 'reports.categories.customerAging.title', descriptionKey: 'reports.categories.customerAging.description', icon: <svg className="w-8 h-8 mb-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg> },
    { id: 'inventoryReports', titleKey: 'reports.categories.inventory.title', descriptionKey: 'reports.categories.inventory.description', icon: <svg className="w-8 h-8 mb-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> },
    { id: 'expenseReports', titleKey: 'reports.categories.expense.title', descriptionKey: 'reports.categories.expense.description', icon: <svg className="w-8 h-8 mb-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
];


const ReportsPage = () => {
    const { t } = useTranslation();
    const [selectedReportType, setSelectedReportType] = useState(null); 

    const handleShowReportSection = (reportId) => {
        setSelectedReportType(reportId);
    };

    const handleHideReportView = () => {
        setSelectedReportType(null);
    };

    // Placeholder for actual report data/component rendering
    const renderSelectedReport = () => {
        if (!selectedReportType) return null;

        const category = reportCategories.find(cat => cat.id === selectedReportType);
        const reportTitle = category ? t(category.titleKey) : t('reports.selectedReport.titlePlaceholder');

        return (
            <div id="selectedReportView" className="mt-10">
                <section className="dashboard-card">
                    <div className="flex justify-between items-center mb-4">
                        <h3 id="selectedReportTitle" className="text-2xl font-heading text-primary">{reportTitle}</h3>
                        <button onClick={handleHideReportView} className="text-sm text-secondary hover:text-primary font-sans">
                            {t('reports.selectedReport.backToAll')}
                        </button>
                    </div>
                    <div className="mb-6 p-4 bg-background rounded-lg border border-borderLight">
                        <p className="text-center text-secondary">{t('reports.selectedReport.filtersPlaceholder')}</p>
                        {/* Add actual filter components here based on reportType */}
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-borderLight min-h-[300px] flex items-center justify-center">
                        <p className="text-center text-secondary">{t('reports.selectedReport.dataPlaceholder')}</p>
                        {/* Add actual report table/chart component here */}
                    </div>
                </section>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
           
            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> {/* Ensure "Reports" or "Analytics" is active */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-heading text-primary">{t('reports.pageTitle')}</h2>
                        <p className="text-secondary font-sans mt-1">{t('reports.pageSubtitle')}</p>
                    </div>

                    {!selectedReportType ? (
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"> {/* Changed to 3 columns for better look */}
                            {reportCategories.map((category) => (
                                <div
                                    key={category.id}
                                    onClick={() => handleShowReportSection(category.id)}
                                    className="report-category-card transform hover:scale-105" // Added transform for subtle hover effect
                                >
                                    {category.icon}
                                    <h3 className="text-xl font-heading text-primary mt-2 mb-1">{t(category.titleKey)}</h3>
                                    <p className="text-xs text-secondary font-sans leading-relaxed">{t(category.descriptionKey)}</p>
                                </div>
                            ))}
                        </section>
                    ) : (
                        renderSelectedReport()
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ReportsPage;