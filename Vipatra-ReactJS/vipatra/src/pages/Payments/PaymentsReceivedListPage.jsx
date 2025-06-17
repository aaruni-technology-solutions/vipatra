import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';
import { PencilIcon } from '@heroicons/react/outline'; // Using PencilIcon for consistency

const PaymentsReceivedListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Added more dummy data to demonstrate vertical scrolling
    const initialPayments = [
        { id: 1, customerName: 'Wellness Clinic Pvt. Ltd.', invoiceNo: 'INV-2024-0078', receiptNo: 'RCPT-105', date: '2024-05-15', amount: '1500.00' },
        { id: 2, customerName: 'Rohan Sharma', invoiceNo: 'INV-2024-0077', receiptNo: 'RCPT-104', date: '2024-05-10', amount: '1200.00' },
        { id: 3, customerName: 'Priya Singh & Associates', invoiceNo: 'INV-2024-0076', receiptNo: 'RCPT-103', date: '2024-05-14', amount: '850.00' },
        { id: 4, customerName: 'Tech Solutions Inc.', invoiceNo: 'INV-2024-0075', receiptNo: 'RCPT-102', date: '2024-05-12', amount: '12600.00' },
        { id: 5, customerName: 'GreenScape Gardens', invoiceNo: 'INV-2024-0074', receiptNo: 'RCPT-101', date: '2024-05-11', amount: '4200.00' },
        { id: 6, customerName: 'Modern Apparel & Fashion', invoiceNo: 'INV-2024-0073', receiptNo: 'RCPT-100', date: '2024-05-09', amount: '7800.00' },
        { id: 7, customerName: 'Coastal Exporters International', invoiceNo: 'INV-2024-0072', receiptNo: 'RCPT-099', date: '2024-05-08', amount: '22500.00' },
        { id: 8, customerName: 'Phoenix Digital Solutions', invoiceNo: 'INV-2024-0071', receiptNo: 'RCPT-098', date: '2024-05-07', amount: '5600.00' },
        { id: 9, customerName: 'City Bakers & Confectionery', invoiceNo: 'INV-2024-0070', receiptNo: 'RCPT-097', date: '2024-05-06', amount: '1950.00' },
        { id: 10, customerName: 'Sunrise Hotels Group', invoiceNo: 'INV-2024-0069', receiptNo: 'RCPT-096', date: '2024-05-05', amount: '11200.00' },
    ];
    
    const [payments] = useState(initialPayments);

    const handleNewClick = () => {
        navigate('/payments-received/new'); 
    };

    return (
        // PAGE LAYOUT: The exact same flexbox structure as the other pages
        <div className="flex flex-col h-full">
            <ActionHeader
                title={t('paymentsReceived.allPaymentsTitle', 'Payments Received')}
                onNewClick={handleNewClick}
                newButtonText={t('paymentsReceived.newPayment', 'New Payment')}
            />

            {/* MAIN CONTENT CONTAINER: Takes all available space and manages its children */}
            <div className="dashboard-card flex flex-col flex-grow mt-4 overflow-hidden">
                {payments.length > 0 ? (
                    <>
                        {/* SCROLLABLE TABLE WRAPPER: This div expands and gets the scrollbars */}
                        <div className="flex-grow overflow-auto">
                            <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {/* STICKY HEADER CELLS: Stick to the top of the scrollable parent */}
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Date</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Receipt #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Customer Name</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Invoice #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-right font-semibold text-primary border-b border-borderDefault">Amount</th>
                                        
                                        {/* STICKY CORNER CELL: Sticks to top-right corner */}
                                        <th className="sticky top-0 right-0 z-30 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map(payment => (
                                        <tr key={payment.id} className="hover:bg-background/50">
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{payment.date}</td>
                                            <td className="p-3 border-b border-borderLight whitespace-nowrap">
                                                <Link to={`/payments-received/${payment.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                    {payment.receiptNo}
                                                </Link>
                                            </td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{payment.customerName}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{payment.invoiceNo}</td>
                                            <td className="p-3 text-right text-primary font-semibold border-b border-borderLight whitespace-nowrap">₹{payment.amount}</td>
                                            
                                            {/* STICKY ACTION CELL: Sticks to the right edge with its own background */}
                                            <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-white hover:bg-background/50">
                                                <div className="flex justify-center items-center">
                                                    <button onClick={() => navigate(`/payments-received/edit/${payment.id}`)} className="table-action-btn" title={t('actions.edit')}>
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* PAGINATION: Sits outside the scrollable area, so it's always visible */}
                        <div className="flex-shrink-0 mt-4 flex justify-end items-center font-sans text-sm text-secondary">
                            <span>Showing 1 to {payments.length} of {payments.length} payments</span>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-xl font-heading text-primary mb-2">{t('paymentsReceived.noPaymentsTitle', 'No Payments Received Yet')}</h3>
                            <p className="text-secondary font-sans mb-6">{t('paymentsReceived.noPaymentsSubtitle', 'Record your first payment by clicking the "New Payment" button.')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentsReceivedListPage;