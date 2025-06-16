// src/pages/PackingSlips/PackingSlipsListPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader'; // 1. IMPORT THE ACTION HEADER

// 2. DUMMY DATA FOR THE LIST VIEW
const initialPackingSlips = [
    { id: 1, customerName: 'Wellness Clinic Pvt. Ltd.', invoiceNo: 'INV-2024-0078', packingSlipNo: 'PS-0012', date: '2024-05-11' },
    { id: 2, customerName: 'Tech Solutions Inc.', invoiceNo: 'INV-2024-0075', packingSlipNo: 'PS-0011', date: '2024-05-02' },
    { id: 3, customerName: 'GreenScape Gardens', invoiceNo: 'INV-2024-0074', packingSlipNo: 'PS-0010', date: '2024-04-29' },
];

const PackingSlipsListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [packingSlips, setPackingSlips] = useState(initialPackingSlips);

    // 3. NAVIGATION HANDLER FOR THE "NEW" BUTTON
    const handleNewClick = () => {
        // This will navigate to your existing create page
        navigate('/packing-slips/new'); 
    };
    
    const pageStyles = `
      .page-container-fixed-header {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden; /* Prevent body from scrolling */
        background-color: #f9fafb; /* Or your main app background */
      }
      .action-header-sticky {
        flex-shrink: 0;
        position: sticky;
        top: 0;
        z-index: 20;
        background-color: inherit;
        padding: 1.5rem 2rem 0; /* Match original p-6/sm:p-8, but no bottom padding */
      }
      .main-content-scrollable {
        flex-grow: 1;
        overflow-y: auto;
        padding: 1.5rem 2rem; /* The main content's own padding */
      }
    `;

    return (
        <div className="page-container-fixed-header">
            <style>{pageStyles}</style>

            <header className="action-header-sticky">
                {/* 4. THE ACTION HEADER IS NOW IN A FIXED POSITION */}
                <ActionHeader
                    title={t('packingSlip.allPackingSlipsTitle', 'All Packing Slips')}
                    onNewClick={handleNewClick}
                />
            </header>
            
            <main className="main-content-scrollable">
                {/* 5. THE TABLE VIEW FOR PACKING SLIPS */}
                <div className="dashboard-card">
                    {packingSlips.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm font-sans">
                                <thead className="bg-background border-b border-borderDefault">
                                    <tr>
                                        <th className="p-3 text-left font-semibold text-primary">{t('packingSlip.table.date', 'Date')}</th>
                                        <th className="p-3 text-left font-semibold text-primary">{t('packingSlip.table.packingSlipNo', 'Packing Slip #')}</th>
                                        <th className="p-3 text-left font-semibold text-primary">{t('packingSlip.table.invoiceNo', 'Invoice #')}</th>
                                        <th className="p-3 text-left font-semibold text-primary">{t('packingSlip.table.customerName', 'Customer Name')}</th>
                                        <th className="p-3 text-center font-semibold text-primary">{t('common.actions', 'Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packingSlips.map(slip => (
                                        <tr key={slip.id} className="border-b border-borderLight hover:bg-background/50">
                                            <td className="p-3 text-secondary">{slip.date}</td>
                                            <td className="p-3">
                                                <Link to={`/packing-slips/${slip.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                    {slip.packingSlipNo}
                                                </Link>
                                            </td>
                                            <td className="p-3 text-secondary">{slip.invoiceNo}</td>
                                            <td className="p-3 text-secondary">{slip.customerName}</td>
                                            <td className="p-3 text-center">
                                                <button className="table-action-btn" title={t('actions.view', 'View')}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-heading text-primary mb-2">{t('packingSlip.noSlipsTitle', 'No Packing Slips Found')}</h3>
                            <p className="text-secondary font-sans mb-6">{t('packingSlip.noSlipsSubtitle', 'Create your first packing slip by clicking the "New" button.')}</p>
                            <button onClick={handleNewClick} className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-5 py-2.5 rounded-lg shadow-md">
                                {t('packingSlip.createFirstSlipBtn', 'Create Packing Slip')}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PackingSlipsListPage;