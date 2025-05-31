// src/pages/Invoices/InvoicesListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';

// Dummy data - replace with API call
const initialInvoices = [
    { id: "INV-2024-0078", customer: "Wellness Clinic Pvt. Ltd.", issueDate: "May 10, 2024", dueDate: "May 25, 2024", amount: "3,500.00", status: "Partially Paid", statusClass: "status-partial" },
    { id: "INV-2024-0077", customer: "Rohan Sharma", issueDate: "May 08, 2024", dueDate: "May 23, 2024", amount: "1,200.00", status: "Paid", statusClass: "status-paid" },
    { id: "INV-2024-0076", customer: "Priya Singh", issueDate: "May 05, 2024", dueDate: "May 12, 2024", amount: "850.00", status: "Overdue", statusClass: "status-overdue" },
    { id: "INV-2024-0075", customer: "Tech Solutions Inc.", issueDate: "May 01, 2024", dueDate: "May 16, 2024", amount: "12,600.00", status: "Sent", statusClass: "status-sent" },
    { id: "INV-2024-0074", customer: "GreenScape Gardens", issueDate: "Apr 28, 2024", dueDate: "May 13, 2024", amount: "4,200.00", status: "Draft", statusClass: "status-draft" },
];

const InvoicesListPage = () => {
    const { t } = useTranslation();
    const [invoices, setInvoices] = useState(initialInvoices);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [openActionDropdown, setOpenActionDropdown] = useState(null); // To track which dropdown is open

    // Effect to handle closing dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openActionDropdown && !event.target.closest(`.actions-dropdown-trigger-${openActionDropdown}`)) {
                setOpenActionDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openActionDropdown]);


    const handleSelectAll = (e) => {
        setSelectAll(e.target.checked);
        if (e.target.checked) {
            setSelectedInvoices(invoices.map(inv => inv.id));
        } else {
            setSelectedInvoices([]);
        }
    };

    const handleSelectSingle = (e, invoiceId) => {
        if (e.target.checked) {
            setSelectedInvoices(prev => [...prev, invoiceId]);
        } else {
            setSelectedInvoices(prev => prev.filter(id => id !== invoiceId));
            setSelectAll(false); // Uncheck selectAll if any individual is unchecked
        }
    };

    useEffect(() => {
        // Check if all individual checkboxes are checked to update selectAll state
        if (invoices.length > 0 && selectedInvoices.length === invoices.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedInvoices, invoices]);


    const toggleInvoiceActions = (invoiceId, event) => {
        event.stopPropagation(); // Prevent click from bubbling up to window listener immediately
        setOpenActionDropdown(openActionDropdown === invoiceId ? null : invoiceId);
    };


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> {/* Assuming 'All Invoices' is active here */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h2 className="text-3xl font-heading text-primary">{t('invoices.allInvoicesTitle', 'All Invoices')}</h2>
                            <p className="text-secondary font-sans mt-1">{t('invoices.allInvoicesSubtitle', 'View, manage, and track all your invoices.')}</p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Link
                                to="/invoices/new" // Link to your InvoiceCreatePage
                                className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{t('invoices.createNewInvoiceBtn', 'Create New Invoice')}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Filters and Search Section */}
                    <section className="dashboard-card mb-6">
                        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                            <div>
                                <label htmlFor="searchInvoice" className="block text-xs font-medium text-primary mb-1">{t('common.search', 'Search')}</label>
                                <input type="text" id="searchInvoice" name="searchInvoice" placeholder={t('invoices.searchPlaceholder', 'Invoice #, Customer...')} className="form-element !p-2.5 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="statusFilter" className="block text-xs font-medium text-primary mb-1">{t('common.status', 'Status')}</label>
                                <select id="statusFilter" name="statusFilter" className="form-element !p-2.5 text-sm">
                                    <option value="">{t('common.allStatuses', 'All Statuses')}</option>
                                    <option value="draft">{t('status.draft', 'Draft')}</option>
                                    <option value="sent">{t('status.sent', 'Sent')}</option>
                                    <option value="viewed">{t('status.viewed', 'Viewed')}</option>
                                    <option value="partial">{t('status.partial', 'Partially Paid')}</option>
                                    <option value="paid">{t('status.paid', 'Paid')}</option>
                                    <option value="overdue">{t('status.overdue', 'Overdue')}</option>
                                    <option value="void">{t('status.void', 'Void')}</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="dateStart" className="block text-xs font-medium text-primary mb-1">{t('common.dateRangeIssue', 'Date Range (Issue Date)')}</label>
                                <input type="date" id="dateStart" name="dateStart" className="form-element !p-2.5 text-sm" />
                                <input type="date" id="dateEnd" name="dateEnd" className="form-element !p-2.5 text-sm mt-1" />
                            </div>
                            <div className="flex space-x-2">
                                <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2.5 rounded-lg shadow-soft text-sm w-full sm:w-auto">{t('common.apply', 'Apply')}</button>
                                <button type="reset" className="font-sans bg-background hover:bg-borderLight text-secondary px-4 py-2.5 rounded-lg shadow-sm border border-borderDefault text-sm w-full sm:w-auto">{t('common.clear', 'Clear')}</button>
                            </div>
                        </form>
                    </section>

                    {/* Bulk Actions Bar */}
                    {selectedInvoices.length > 0 && (
                        <div id="bulkActionsBar" className="mb-4 bg-primary/10 p-3 rounded-lg flex flex-wrap items-center gap-3">
                            <span className="text-sm font-medium text-primary">{t('invoices.withSelected', 'With Selected ({{count}}):', { count: selectedInvoices.length })}</span>
                            <button className="text-xs font-sans bg-accent hover:bg-accent-dark text-textDark px-3 py-1.5 rounded-md shadow-soft">{t('actions.sendReminders', 'Send Reminders')}</button>
                            <button className="text-xs font-sans bg-accent hover:bg-accent-dark text-textDark px-3 py-1.5 rounded-md shadow-soft">{t('actions.markAsPaid', 'Mark as Paid')}</button>
                            <button className="text-xs font-sans bg-secondary hover:bg-secondary/80 text-textOnSecondary px-3 py-1.5 rounded-md shadow-soft">{t('actions.downloadPDFs', 'Download PDFs')}</button>
                        </div>
                    )}

                    {/* Summary Stats (Optional) */}
                    <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {/* ... Summary stat cards ... */}
                        <div className="bg-background p-4 rounded-lg shadow-sm text-center"> <p className="text-xs text-secondary uppercase">{t('invoices.totalInvoices', 'Total Invoices')}</p> <p className="text-2xl font-bold text-primary">152</p> </div>
                        <div className="bg-background p-4 rounded-lg shadow-sm text-center"> <p className="text-xs text-secondary uppercase">{t('invoices.totalOutstanding', 'Total Outstanding')}</p> <p className="text-2xl font-bold text-danger-DEFAULT">₹85,300</p> </div>
                        <div className="bg-background p-4 rounded-lg shadow-sm text-center"> <p className="text-xs text-secondary uppercase">{t('invoices.overdueAmount', 'Overdue')}</p> <p className="text-2xl font-bold text-danger-dark">₹12,750</p> </div>
                        <div className="bg-background p-4 rounded-lg shadow-sm text-center"> <p className="text-xs text-secondary uppercase">{t('invoices.paidThisMonth', 'Paid (This Month)')}</p> <p className="text-2xl font-bold text-success-dark">₹1,20,500</p> </div>
                    </section>

                    {/* Invoice Table */}
                    <div className="dashboard-card overflow-x-auto">
                        <table className="w-full min-w-[900px] text-sm font-sans">
                            <thead className="bg-background border-b border-borderDefault">
                                <tr>
                                    <th className="p-3 w-10 text-center">
                                        <input type="checkbox" id="selectAllInvoices"
                                               checked={selectAll}
                                               onChange={handleSelectAll}
                                               className="form-checkbox h-4 w-4 text-primary rounded border-gray-400 focus:ring-primary" />
                                    </th>
                                    <th className="p-3 text-left font-semibold text-primary">{t('invoices.table.invoiceNo', 'Invoice #')}</th>
                                    <th className="p-3 text-left font-semibold text-primary">{t('invoices.table.customer', 'Customer')}</th>
                                    <th className="p-3 text-left font-semibold text-primary">{t('invoices.table.issueDate', 'Issue Date')}</th>
                                    <th className="p-3 text-left font-semibold text-primary">{t('invoices.table.dueDate', 'Due Date')}</th>
                                    <th className="p-3 text-right font-semibold text-primary">{t('invoices.table.amount', 'Amount (₹)')}</th>
                                    <th className="p-3 text-center font-semibold text-primary">{t('common.status', 'Status')}</th>
                                    <th className="p-3 text-center font-semibold text-primary">{t('common.actions', 'Actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id} className="border-b border-borderLight hover:bg-background/50">
                                        <td className="p-3 text-center">
                                            <input type="checkbox" name="invoice_ids[]" value={invoice.id}
                                                   checked={selectedInvoices.includes(invoice.id)}
                                                   onChange={(e) => handleSelectSingle(e, invoice.id)}
                                                   className="form-checkbox h-4 w-4 text-primary rounded border-gray-400 focus:ring-primary invoice-checkbox" />
                                        </td>
                                        <td className="p-3 text-primary font-medium">
                                            <Link to={`/invoices/${invoice.id}`} className="hover:text-accent hover:underline">{invoice.id}</Link>
                                        </td>
                                        <td className="p-3 text-secondary">{invoice.customer}</td>
                                        <td className="p-3 text-secondary">{invoice.issueDate}</td>
                                        <td className="p-3 text-secondary">{invoice.dueDate}</td>
                                        <td className="p-3 text-right text-primary font-semibold">₹{invoice.amount}</td>
                                        <td className="p-3 text-center"><span className={`status-badge ${invoice.statusClass}`}>{t(`status.${invoice.status.toLowerCase().replace(' ', '')}`, invoice.status)}</span></td>
                                        <td className="p-3 text-center">
                                            <div className={`relative flex justify-center items-center space-x-1 actions-dropdown-trigger-${invoice.id}`}>
                                                <Link to={`/invoices/${invoice.id}`} className="table-action-btn" title={t('actions.view', 'View')}>
                                                    <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                                </Link>
                                                <Link to={`/invoices/edit/${invoice.id}`} className="table-action-btn" title={t('actions.edit', 'Edit')}> {/* Assuming an edit route */}
                                                    <svg viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                </Link>
                                                <button className="table-action-btn" title={t('actions.moreActions', 'More Actions')} onClick={(e) => toggleInvoiceActions(invoice.id, e)}>
                                                    <svg viewBox="0 0 20 20" fill="currentColor"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                                                </button>
                                                {/* Hidden Actions Dropdown */}
                                                {openActionDropdown === invoice.id && (
                                                    <div className="absolute right-full mr-1 top-0 mt-0 w-40 bg-cardBg rounded-md shadow-lg border border-borderLight z-10 py-1">
                                                        <a href="#" className="block px-4 py-2 text-xs text-primary hover:bg-background">{t('actions.recordPayment', 'Record Payment')}</a>
                                                        <a href="#" className="block px-4 py-2 text-xs text-primary hover:bg-background">{t('actions.sendReminder', 'Send Reminder')}</a>
                                                        <a href="#" className="block px-4 py-2 text-xs text-primary hover:bg-background">{t('actions.downloadPDF', 'Download PDF')}</a>
                                                        <a href="#" className="block px-4 py-2 text-xs text-primary hover:bg-background">{t('actions.duplicate', 'Duplicate')}</a>
                                                        <a href="#" className="block px-4 py-2 text-xs text-danger-DEFAULT hover:bg-danger-light">{t('actions.void', 'Void')}</a>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {invoices.length === 0 && (
                            <p className="text-center text-secondary py-8">{t('invoices.noInvoicesFound', 'No invoices found matching your criteria.')}</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center font-sans text-sm text-secondary">
                        <span>{t('pagination.showingRange', 'Showing {{start}} to {{end}} of {{total}} invoices', {start: 1, end: invoices.length > 10 ? 10 : invoices.length, total: invoices.length})}</span>
                        <div className="flex space-x-1 mt-2 sm:mt-0">
                            <button className="px-3 py-1 border border-borderDefault rounded-md hover:bg-background disabled:opacity-50" disabled>{t('pagination.previous', 'Previous')}</button>
                            <button className="px-3 py-1 border border-borderDefault rounded-md bg-primary text-textOnPrimary">1</button>
                            {/* Add more page numbers dynamically */}
                            <button className="px-3 py-1 border border-borderDefault rounded-md hover:bg-background">{t('pagination.next', 'Next')}</button>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default InvoicesListPage;