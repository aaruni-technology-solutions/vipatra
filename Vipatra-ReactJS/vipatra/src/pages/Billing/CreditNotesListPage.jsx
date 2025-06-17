import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';
import { PencilIcon } from '@heroicons/react/outline';

const CreditNotesListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Expanded dummy data to demonstrate scrolling and statuses
    const initialCreditNotes = [
        { id: 1, customerName: 'Tech Solutions Inc.', invoiceNo: 'INV-2024-0075', creditNoteNo: 'CN-0005', date: '2024-05-18', amount: '500.00', status: 'Open' },
        { id: 2, customerName: 'Priya Singh & Associates', invoiceNo: 'INV-2024-0076', creditNoteNo: 'CN-0004', date: '2024-05-15', amount: '150.00', status: 'Closed' },
        { id: 3, customerName: 'Wellness Clinic Pvt. Ltd.', invoiceNo: 'INV-2024-0078', creditNoteNo: 'CN-0003', date: '2024-05-12', amount: '250.00', status: 'Applied' },
        { id: 4, customerName: 'GreenScape Gardens', invoiceNo: 'INV-2024-0074', creditNoteNo: 'CN-0002', date: '2024-05-10', amount: '300.00', status: 'Open' },
        { id: 5, customerName: 'Modern Apparel & Fashion', invoiceNo: 'INV-2024-0073', creditNoteNo: 'CN-0001', date: '2024-05-08', amount: '120.00', status: 'Closed' },
        { id: 6, customerName: 'Coastal Exporters International', invoiceNo: 'INV-2024-0072', creditNoteNo: 'CN-0006', date: '2024-05-20', amount: '750.00', status: 'Open' },
        { id: 7, customerName: 'Phoenix Digital Solutions', invoiceNo: 'INV-2024-0071', creditNoteNo: 'CN-0007', date: '2024-05-21', amount: '400.00', status: 'Applied' },
    ];
    
    const [creditNotes] = useState(initialCreditNotes);

    const handleNewClick = () => {
        navigate('/credit-notes/new'); 
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'open': return 'status-sent'; // Blue
            case 'closed': return 'status-draft'; // Gray
            case 'applied': return 'status-paid'; // Green
            default: return 'status-draft';
        }
    };

    return (
        // PAGE LAYOUT: Applying the standard flexbox structure
        <div className="flex flex-col h-full">
            <ActionHeader
                title={t('creditNote.allCreditNotesTitle', 'All Credit Notes')}
                onNewClick={handleNewClick}
                newButtonText={t('creditNote.newCreditNote', 'New Credit Note')}
            />

            {/* MAIN CONTENT CONTAINER: Manages layout and overflow */}
            <div className="dashboard-card flex flex-col flex-grow mt-4 overflow-hidden">
                {creditNotes.length > 0 ? (
                    <>
                        {/* SCROLLABLE TABLE WRAPPER: This is the element that scrolls */}
                        <div className="flex-grow overflow-auto">
                            <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {/* STICKY HEADER CELLS */}
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Date</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Credit Note #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Ref Invoice #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Customer Name</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Status</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-right font-semibold text-primary border-b border-borderDefault">Amount</th>

                                        {/* STICKY CORNER CELL */}
                                        <th className="sticky top-0 right-0 z-30 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creditNotes.map(cn => (
                                        <tr key={cn.id} className="hover:bg-background/50">
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{cn.date}</td>
                                            <td className="p-3 border-b border-borderLight whitespace-nowrap">
                                                <Link to={`/credit-notes/${cn.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                    {cn.creditNoteNo}
                                                </Link>
                                            </td>
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{cn.invoiceNo}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{cn.customerName}</td>
                                            <td className="p-3 text-center border-b border-borderLight">
                                                <span className={`status-badge ${getStatusClass(cn.status)}`}>
                                                    {t(`status.${cn.status.toLowerCase()}`, cn.status)}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right text-primary font-semibold border-b border-borderLight whitespace-nowrap">₹{cn.amount}</td>

                                            {/* STICKY ACTION CELL */}
                                            <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-white hover:bg-background/50">
                                                <div className="flex justify-center items-center">
                                                    <button onClick={() => navigate(`/credit-notes/edit/${cn.id}`)} className="table-action-btn" title={t('actions.edit')}>
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* PAGINATION: Sits outside the scrollable area */}
                        <div className="flex-shrink-0 mt-4 flex justify-end items-center font-sans text-sm text-secondary">
                            <span>Showing 1 to {creditNotes.length} of {creditNotes.length} credit notes</span>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-xl font-heading text-primary mb-2">{t('creditNote.noCreditNotesTitle', 'No Credit Notes Found')}</h3>
                            <p className="text-secondary font-sans mb-6">{t('creditNote.noCreditNotesSubtitle', 'Create your first credit note by clicking the "New Credit Note" button.')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreditNotesListPage;