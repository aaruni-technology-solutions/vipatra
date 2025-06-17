import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';
import { PencilIcon } from '@heroicons/react/outline';

const InvoicesListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Added more dummy data to ensure vertical scrolling is visible
    const initialInvoices = [
        { id: 1, invoiceNo: "INV-2024-0078", customer: "Wellness Clinic Pvt. Ltd.", issueDate: "May 10, 2024", dueDate: "May 25, 2024", amount: "3500.00", status: "Partially Paid" },
        { id: 2, invoiceNo: "INV-2024-0077", customer: "Rohan Sharma", issueDate: "May 08, 2024", dueDate: "May 23, 2024", amount: "1200.00", status: "Paid" },
        { id: 3, invoiceNo: "INV-2024-0076", customer: "Priya Singh & Associates", issueDate: "May 05, 2024", dueDate: "May 12, 2024", amount: "850.00", status: "Overdue" },
        { id: 4, invoiceNo: "INV-2024-0075", customer: "Tech Solutions Inc.", issueDate: "May 01, 2024", dueDate: "May 16, 2024", amount: "12600.00", status: "Sent" },
        { id: 5, invoiceNo: "INV-2024-0074", customer: "GreenScape Gardens", issueDate: "Apr 28, 2024", dueDate: "May 13, 2024", amount: "4200.00", status: "Draft" },
        { id: 6, invoiceNo: "INV-2024-0073", customer: "Modern Apparel & Fashion House", issueDate: "Apr 25, 2024", dueDate: "May 10, 2024", amount: "7800.00", status: "Paid" },
        { id: 7, invoiceNo: "INV-2024-0072", customer: "Coastal Exporters International", issueDate: "Apr 22, 2024", dueDate: "May 07, 2024", amount: "22500.00", status: "Sent" },
        { id: 8, invoiceNo: "INV-2024-0071", customer: "Phoenix Digital Solutions", issueDate: "Apr 20, 2024", dueDate: "May 05, 2024", amount: "5600.00", status: "Overdue" },
        { id: 9, invoiceNo: "INV-2024-0070", customer: "City Bakers & Confectionery", issueDate: "Apr 18, 2024", dueDate: "May 03, 2024", amount: "1950.00", status: "Paid" },
        { id: 10, invoiceNo: "INV-2024-0069", customer: "Sunrise Hotels Group", issueDate: "Apr 15, 2024", dueDate: "Apr 30, 2024", amount: "11200.00", status: "Sent" },
        { id: 11, invoiceNo: "INV-2024-0068", customer: "Quantum Innovations Ltd.", issueDate: "Apr 12, 2024", dueDate: "Apr 27, 2024", amount: "45000.00", status: "Partially Paid" },
        { id: 12, invoiceNo: "INV-2024-0067", customer: "DeepSea Logistics & Shipping", issueDate: "Apr 10, 2024", dueDate: "Apr 25, 2024", amount: "32000.00", status: "Paid" }
    ];
    
    const [invoices] = useState(initialInvoices);

    const handleNewInvoiceClick = () => {
        navigate('/invoices/new');
    };

    return (
        // PAGE LAYOUT: The exact same flexbox structure as the reference examples
        <div className="flex flex-col h-full">
            <ActionHeader
                title={t('invoices.allInvoicesTitle', 'All Invoices')}
                onNewClick={handleNewInvoiceClick}
                newButtonText={t('invoices.newInvoice', 'New Invoice')}
            />

            {/* MAIN CONTENT CONTAINER: Takes all available space, lays out children vertically, and prevents its own scrollbars */}
            <div className="dashboard-card flex flex-col flex-grow mt-4 overflow-hidden">
                {invoices.length > 0 ? (
                    <>
                        {/* SCROLLABLE TABLE WRAPPER: This div expands and gets the scrollbars */}
                        <div className="flex-grow overflow-auto">
                            <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {/* STICKY HEADER CELLS: Stick to the top of the scrollable parent */}
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Issue Date</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Invoice #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Customer Name</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Due Date</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Status</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-right font-semibold text-primary border-b border-borderDefault">Amount</th>
                                        
                                        {/* STICKY CORNER CELL: Sticks to top-right corner with highest z-index */}
                                        <th className="sticky top-0 right-0 z-30 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map(inv => (
                                        <tr key={inv.id} className="hover:bg-background/50">
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{inv.issueDate}</td>
                                            <td className="p-3 border-b border-borderLight whitespace-nowrap">
                                                <Link to={`/invoices/${inv.id}`} className="text-primary font-medium hover:text-accent hover:underline">{inv.invoiceNo}</Link>
                                            </td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{inv.customer}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{inv.dueDate}</td>
                                            <td className="p-3 text-center border-b border-borderLight">
                                                <span className={`status-badge status-${inv.status.toLowerCase().replace(' ', '-')}`}>
                                                    {t(`status.${inv.status.toLowerCase().replace(' ', '_')}`, inv.status)}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right text-primary font-semibold border-b border-borderLight whitespace-nowrap">₹{inv.amount}</td>
                                            
                                            {/* STICKY ACTION CELL: Sticks to the right edge and needs a background to hide content scrolling under it */}
                                            <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-white hover:bg-background/50">
                                                <div className="flex justify-center items-center space-x-1">
                                                    <button onClick={() => navigate(`/invoices/edit/${inv.id}`)} className="table-action-btn" title={t('actions.edit')}>
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
                            <span>Showing 1 to {invoices.length} of {invoices.length} invoices</span>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-xl font-heading text-primary mb-2">{t('invoices.noInvoicesTitle', 'No Invoices Found')}</h3>
                            <p className="text-secondary font-sans mb-6">{t('invoices.noInvoicesSubtitle', 'Create your first invoice by clicking the "New Invoice" button.')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvoicesListPage;