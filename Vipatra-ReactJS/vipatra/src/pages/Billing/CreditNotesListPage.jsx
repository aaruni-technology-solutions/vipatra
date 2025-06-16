// src/pages/Billing/CreditNotesListPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';

// Dummy data for the list view
const initialCreditNotes = [
    { id: 1, customerName: 'Tech Solutions Inc.', invoiceNo: 'INV-2024-0075', creditNoteNo: 'CN-0005', date: '2024-05-18', amount: '500.00' },
    { id: 2, customerName: 'Priya Singh', invoiceNo: 'INV-2024-0076', creditNoteNo: 'CN-0004', date: '2024-05-15', amount: '150.00' },
    { id: 3, customerName: 'Wellness Clinic Pvt. Ltd.', invoiceNo: 'INV-2024-0078', creditNoteNo: 'CN-0003', date: '2024-05-12', amount: '250.00' },
];

const CreditNotesListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [creditNotes, setCreditNotes] = useState(initialCreditNotes);

    // Navigation handler for the "New" button in the ActionHeader
    const handleNewClick = () => {
        // Navigate to your existing create page
        navigate('/credit-notes/new'); 
    };

    const pageStyles = `
      .page-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden; /* Prevent body from scrolling */
        background-color: #f9fafb; /* Or your main app background */
      }
      .fixed-header {
        flex-shrink: 0;
        position: sticky;
        top: 0;
        z-index: 20;
        background-color: inherit; /* Inherit background from parent */
        padding: 1.5rem 2rem 0; /* Original p-6/sm:p-8, but with no bottom padding */
      }
      .scrollable-content {
        flex-grow: 1;
        overflow-y: auto;
        padding: 1.5rem 2rem; /* The main content's own padding */
      }
    `;

    return (
        <div className="page-container">
            <style>{pageStyles}</style>

            <header className="fixed-header">
                {/* The ActionHeader is now in a fixed position */}
                <ActionHeader
                    title={t('creditNote.allCreditNotesTitle', 'All Credit Notes')}
                    onNewClick={handleNewClick}
                />
            </header>

            <main className="scrollable-content">
                {/* The table view for Credit Notes */}
                <div className="dashboard-card">
                    {creditNotes.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm font-sans">
                                <thead className="bg-background border-b border-borderDefault">
                                    <tr>
                                        <th className="p-3 text-left font-semibold text-primary">{t('creditNote.table.date', 'Date')}</th>
                                        <th className="p-3 text-left font-semibold text-primary">{t('creditNote.table.creditNoteNo', 'Credit Note #')}</th>
                                        <th className="p-3 text-left font-semibold text-primary">{t('creditNote.table.invoiceNo', 'Ref Invoice #')}</th>
                                        <th className="p-3 text-left font-semibold text-primary">{t('creditNote.table.customerName', 'Customer Name')}</th>
                                        <th className="p-3 text-center font-semibold text-primary">{t('common.status', 'Status')}</th>
                                        <th className="p-3 text-right font-semibold text-primary">{t('creditNote.table.amount', 'Amount')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creditNotes.map(cn => (
                                        <tr key={cn.id} className="border-b border-borderLight hover:bg-background/50">
                                            <td className="p-3 text-secondary">{cn.date}</td>
                                            <td className="p-3">
                                                <Link to={`/credit-notes/${cn.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                    {cn.creditNoteNo}
                                                </Link>
                                            </td>
                                            <td className="p-3 text-secondary">{cn.invoiceNo}</td>
                                            <td className="p-3 text-secondary">{cn.customerName}</td>
                                            <td className="p-3 text-center">
                                                <span className="status-badge status-active">
                                                    {t('status.open', 'Open')}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right text-primary font-semibold">₹{cn.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-heading text-primary mb-2">{t('creditNote.noCreditNotesTitle', 'No Credit Notes Found')}</h3>
                            <p className="text-secondary font-sans mb-6">{t('creditNote.noCreditNotesSubtitle', 'Create your first credit note by clicking the "New" button.')}</p>
                            <button onClick={handleNewClick} className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-5 py-2.5 rounded-lg shadow-md">
                                {t('creditNote.createFirstCreditNoteBtn', 'Create Credit Note')}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CreditNotesListPage;