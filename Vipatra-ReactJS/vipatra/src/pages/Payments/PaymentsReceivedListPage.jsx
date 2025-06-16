// src/pages/Payments/PaymentsReceivedListPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import ActionHeader from '../../components/layout/ActionHeader';

// Dummy data for the list view
const initialPayments = [
    { id: 1, customerName: 'Wellness Clinic Pvt. Ltd.', invoiceNo: 'INV-2024-0078', receiptNo: 'RCPT-105', date: '2024-05-15', amount: '1,500.00' },
    { id: 2, customerName: 'Rohan Sharma', invoiceNo: 'INV-2024-0077', receiptNo: 'RCPT-104', date: '2024-05-10', amount: '1,200.00' },
    { id: 3, customerName: 'Priya Singh', invoiceNo: 'INV-2024-0076', receiptNo: 'RCPT-103', date: '2024-05-14', amount: '850.00' },
];

const PaymentsReceivedListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [payments, setPayments] = useState(initialPayments);

    // Navigation handler for the "New" button in the ActionHeader
    const handleNewClick = () => {
        // Navigate to your existing create page
        navigate('/payments-received/new'); 
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    {/* Add the ActionHeader */}
                    <ActionHeader
                        title={t('paymentsReceived.allPaymentsTitle', 'Payments Received')}
                        onNewClick={handleNewClick}
                    />
                    
                    {/* The table view for Payments Received */}
                    <div className="dashboard-card">
                        {payments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm font-sans">
                                    <thead className="bg-background border-b border-borderDefault">
                                        <tr>
                                            <th className="p-3 text-left font-semibold text-primary">{t('paymentsReceived.table.date', 'Date')}</th>
                                            <th className="p-3 text-left font-semibold text-primary">{t('paymentsReceived.table.receiptNo', 'Receipt #')}</th>
                                            <th className="p-3 text-left font-semibold text-primary">{t('paymentsReceived.table.customerName', 'Customer Name')}</th>
                                            <th className="p-3 text-left font-semibold text-primary">{t('paymentsReceived.table.invoiceNo', 'Invoice #')}</th>
                                            <th className="p-3 text-right font-semibold text-primary">{t('paymentsReceived.table.amount', 'Amount')}</th>
                                            <th className="p-3 text-center font-semibold text-primary">{t('common.actions', 'Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map(payment => (
                                            <tr key={payment.id} className="border-b border-borderLight hover:bg-background/50">
                                                <td className="p-3 text-secondary">{payment.date}</td>
                                                <td className="p-3">
                                                    <Link to={`/payments-received/${payment.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                        {payment.receiptNo}
                                                    </Link>
                                                </td>
                                                <td className="p-3 text-secondary">{payment.customerName}</td>
                                                <td className="p-3 text-secondary">{payment.invoiceNo}</td>
                                                <td className="p-3 text-right text-primary font-semibold">₹{payment.amount}</td>
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
                                <h3 className="text-xl font-heading text-primary mb-2">{t('paymentsReceived.noPaymentsTitle', 'No Payments Received Yet')}</h3>
                                <p className="text-secondary font-sans mb-6">{t('paymentsReceived.noPaymentsSubtitle', 'Record your first payment by clicking the "New" button.')}</p>
                                <button onClick={handleNewClick} className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-5 py-2.5 rounded-lg shadow-md">
                                    {t('paymentsReceived.recordFirstPaymentBtn', 'Record Payment')}
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentsReceivedListPage;