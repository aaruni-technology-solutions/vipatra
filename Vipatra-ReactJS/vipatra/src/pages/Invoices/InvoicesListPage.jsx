// src/pages/Invoices/InvoicesListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
// Icons (assuming you have an icon library or SVGs)
import { EyeIcon, PencilIcon, DotsVerticalIcon, DocumentDownloadIcon, MailIcon, DuplicateIcon, XCircleIcon, CheckCircleIcon, CashIcon } from '@heroicons/react/outline'; // Example with Heroicons
// If not using heroicons, replace with your SVG components or paths

// Dummy data - replace with API call
const initialInvoices = [
    { id: "INV-2024-0078", customer: "Wellness Clinic Pvt. Ltd.", issueDate: "May 10, 2024", dueDate: "May 25, 2024", amount: "3,500.00", status: "Partially Paid", statusKey: "status.partial", statusClass: "status-partial" },
    { id: "INV-2024-0077", customer: "Rohan Sharma", issueDate: "May 08, 2024", dueDate: "May 23, 2024", amount: "1,200.00", status: "Paid", statusKey: "status.paid", statusClass: "status-paid" },
    { id: "INV-2024-0076", customer: "Priya Singh", issueDate: "May 05, 2024", dueDate: "May 12, 2024", amount: "850.00", status: "Overdue", statusKey: "status.overdue", statusClass: "status-overdue" },
    { id: "INV-2024-0075", customer: "Tech Solutions Inc.", issueDate: "May 01, 2024", dueDate: "May 16, 2024", amount: "12,600.00", status: "Sent", statusKey: "status.sent", statusClass: "status-sent" },
    { id: "INV-2024-0074", customer: "GreenScape Gardens", issueDate: "Apr 28, 2024", dueDate: "May 13, 2024", amount: "4,200.00", status: "Draft", statusKey: "status.draft", statusClass: "status-draft" },
];

const summaryStatsData = { // Dummy data
    totalInvoices: 152,
    totalOutstanding: "85,300",
    overdueAmount: "12,750",
    paidThisMonth: "1,20,500"
};

const InvoicesListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate(); // For programmatic navigation
    const [invoices, setInvoices] = useState(initialInvoices);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [openActionDropdown, setOpenActionDropdown] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openActionDropdown && !event.target.closest(`.actions-dropdown-container-${openActionDropdown}`)) {
                setOpenActionDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openActionDropdown]);

    const handleSelectAll = (e) => { /* ... same as before ... */ };
    const handleSelectSingle = (e, invoiceId) => { /* ... same as before ... */ };
    useEffect(() => { /* ... same as before for selectAll logic ... */ }, [selectedInvoices, invoices]);

    const toggleInvoiceActions = (invoiceId, event) => {
        event.stopPropagation();
        setOpenActionDropdown(openActionDropdown === invoiceId ? null : invoiceId);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h2 className="text-3xl font-heading text-primary">{t('invoices.allInvoicesTitle')}</h2>
                            <p className="text-secondary font-sans mt-1">{t('invoices.allInvoicesSubtitle')}</p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Link
                                to="/invoices/new"
                                className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center space-x-2 text-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{t('invoices.createNewInvoiceBtn')}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Filters and Search Section - More compact */}
                    <section className="filter-section-card">
                        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                            <div className="lg:col-span-2">
                                <label htmlFor="searchInvoice" className="block text-xs font-medium text-primary mb-1">{t('common.search')}</label>
                                <input type="text" id="searchInvoice" name="searchInvoice" placeholder={t('invoices.searchPlaceholder')} className="form-element !p-2 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="statusFilter" className="block text-xs font-medium text-primary mb-1">{t('common.status')}</label>
                                <select id="statusFilter" name="statusFilter" className="form-element !p-2 text-sm">
                                    <option value="">{t('common.allStatuses')}</option>
                                    <option value="draft">{t('status.draft')}</option>
                                    {/* ... other statuses ... */}
                                     <option value="sent">{t('status.sent')}</option>
                                    <option value="viewed">{t('status.viewed')}</option>
                                    <option value="partial">{t('status.partial')}</option>
                                    <option value="paid">{t('status.paid')}</option>
                                    <option value="overdue">{t('status.overdue')}</option>
                                    <option value="void">{t('status.void')}</option>
                                </select>
                            </div>
                            <div> {/* Date Range - can be a single Date Range Picker component later */}
                                <label htmlFor="dateStart" className="block text-xs font-medium text-primary mb-1">{t('common.dateRangeIssue')}</label>
                                <input type="date" id="dateStart" name="dateStart" className="form-element !p-2 text-sm" />
                                {/* You might use a proper date range picker component here */}
                            </div>
                            <div className="flex space-x-2 items-end"> {/* Buttons aligned to the bottom of their grid cell */}
                                <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2 rounded-lg shadow-sm text-sm w-full">
                                    {t('common.apply')}
                                </button>
                                <button type="reset" className="font-sans bg-background hover:bg-borderLight text-secondary px-4 py-2 rounded-lg shadow-sm border border-borderDefault text-sm w-full">
                                    {t('common.clear')}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Bulk Actions Bar - slightly more refined */}
                    {selectedInvoices.length > 0 && (
                        <div className="mb-6 bg-primary/5 p-3 rounded-lg flex flex-wrap items-center gap-x-4 gap-y-2 border border-primary/20">
                            <span className="text-sm font-medium text-primary">{t('invoices.withSelected', { count: selectedInvoices.length })}</span>
                            <div className="flex flex-wrap gap-2">
                                <button className="text-xs font-sans bg-accent hover:bg-accent-dark text-textDark px-3 py-1.5 rounded-md shadow-soft flex items-center space-x-1.5">
                                    <MailIcon className="w-4 h-4" /> <span>{t('actions.sendReminders')}</span>
                                </button>
                                <button className="text-xs font-sans bg-success-DEFAULT hover:bg-success-dark text-textLight px-3 py-1.5 rounded-md shadow-soft flex items-center space-x-1.5">
                                    <CheckCircleIcon className="w-4 h-4" /> <span>{t('actions.markAsPaid')}</span>
                                </button>
                                <button className="text-xs font-sans bg-secondary hover:bg-secondary/80 text-textOnSecondary px-3 py-1.5 rounded-md shadow-soft flex items-center space-x-1.5">
                                   <DocumentDownloadIcon className="w-4 h-4" /> <span>{t('actions.downloadPDFs')}</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Summary Stats - using new card style */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="summary-stat-card"><p>{t('invoices.totalInvoices')}</p><p>{summaryStatsData.totalInvoices}</p></div>
                        <div className="summary-stat-card"><p>{t('invoices.totalOutstanding')}</p><p className="text-danger-DEFAULT">₹{summaryStatsData.totalOutstanding}</p></div>
                        <div className="summary-stat-card"><p>{t('invoices.overdueAmount')}</p><p className="text-danger-dark">₹{summaryStatsData.overdueAmount}</p></div>
                        <div className="summary-stat-card"><p>{t('invoices.paidThisMonth')}</p><p className="text-success-dark">₹{summaryStatsData.paidThisMonth}</p></div>
                    </section>

                    {/* Invoice Table - with .invoice-table for specific styling */}
                    <div className="dashboard-card overflow-x-auto p-0"> {/* Removed padding here, table cells will have it */}
                        <table className="invoice-table w-full min-w-[900px] text-sm font-sans">
                            <thead>
                                <tr>
                                    <th className="p-3 w-12 text-center"> {/* Increased width slightly */}
                                        <input type="checkbox" id="selectAllInvoices" checked={selectAll} onChange={handleSelectAll} className="form-checkbox h-4 w-4 text-primary rounded border-gray-400 focus:ring-primary focus:ring-offset-0" />
                                    </th>
                                    <th>{t('invoices.table.invoiceNo')}</th>
                                    <th>{t('invoices.table.customer')}</th>
                                    <th>{t('invoices.table.issueDate')}</th>
                                    <th>{t('invoices.table.dueDate')}</th>
                                    <th className="text-right">{t('invoices.table.amount')}</th>
                                    <th className="text-center">{t('common.status')}</th>
                                    <th className="text-center">{t('common.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td className="text-center">
                                            <input type="checkbox" value={invoice.id} checked={selectedInvoices.includes(invoice.id)} onChange={(e) => handleSelectSingle(e, invoice.id)} className="form-checkbox h-4 w-4 text-primary rounded border-gray-400 focus:ring-primary focus:ring-offset-0 invoice-checkbox" />
                                        </td>
                                        <td><Link to={`/invoices/${invoice.id}`} className="invoice-number-link">{invoice.id}</Link></td>
                                        <td className="text-secondary">{invoice.customer}</td>
                                        <td className="text-secondary">{invoice.issueDate}</td>
                                        <td className="text-secondary">{invoice.dueDate}</td>
                                        <td className="text-right text-primary font-semibold">₹{invoice.amount}</td>
                                        <td className="text-center"><span className={`status-badge ${invoice.statusClass}`}>{t(invoice.statusKey, invoice.status)}</span></td>
                                        <td className="text-center">
                                            <div className={`relative flex justify-center items-center space-x-0.5 actions-dropdown-container-${invoice.id}`}> {/* Reduced space */}
                                                <button onClick={() => navigate(`/invoices/${invoice.id}`)} className="table-action-btn" title={t('actions.view')}> <EyeIcon className="w-5 h-5" /> </button>
                                                <button onClick={() => navigate(`/invoices/edit/${invoice.id}`)} className="table-action-btn" title={t('actions.edit')}> <PencilIcon className="w-5 h-5" /> </button>
                                                <button className="table-action-btn" title={t('actions.moreActions')} onClick={(e) => toggleInvoiceActions(invoice.id, e)}> <DotsVerticalIcon className="w-5 h-5" /> </button>
                                                {openActionDropdown === invoice.id && (
                                                    <div className="absolute right-0 bottom-full mb-1 w-44 bg-cardBg rounded-md shadow-xl border border-borderLight z-20 py-1"> {/* Positioned above */}
                                                        <a href="#" className="block px-3 py-1.5 text-xs text-primary hover:bg-background flex items-center space-x-2"><CashIcon className="w-4 h-4 text-secondary"/><span>{t('actions.recordPayment')}</span></a>
                                                        <a href="#" className="block px-3 py-1.5 text-xs text-primary hover:bg-background flex items-center space-x-2"><MailIcon className="w-4 h-4 text-secondary"/><span>{t('actions.sendReminder')}</span></a>
                                                        <a href="#" className="block px-3 py-1.5 text-xs text-primary hover:bg-background flex items-center space-x-2"><DocumentDownloadIcon className="w-4 h-4 text-secondary"/><span>{t('actions.downloadPDF')}</span></a>
                                                        <a href="#" className="block px-3 py-1.5 text-xs text-primary hover:bg-background flex items-center space-x-2"><DuplicateIcon className="w-4 h-4 text-secondary"/><span>{t('actions.duplicate')}</span></a>
                                                        <a href="#" className="block px-3 py-1.5 text-xs text-danger-DEFAULT hover:bg-danger-light flex items-center space-x-2"><XCircleIcon className="w-4 h-4 text-danger-DEFAULT"/><span>{t('actions.void')}</span></a>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {invoices.length === 0 && (<p className="text-center text-secondary py-10">{t('invoices.noInvoicesFound')}</p>)}
                    </div>

                    {/* Pagination - Slightly more styled */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center font-sans text-sm text-secondary">
                        <span>{t('pagination.showingRange', { start: 1, end: Math.min(10, invoices.length), total: invoices.length })}</span>
                        <div className="flex space-x-1 mt-3 sm:mt-0">
                            <button className="px-3 py-1.5 border border-borderDefault rounded-md hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed text-xs" disabled>{t('pagination.previous')}</button>
                            <button className="px-3 py-1.5 border border-primary bg-primary text-textOnPrimary rounded-md text-xs">1</button>
                            <button className="px-3 py-1.5 border border-borderDefault rounded-md hover:bg-background text-xs">2</button>
                            <button className="px-3 py-1.5 border border-borderDefault rounded-md hover:bg-background text-xs">3</button>
                            <span className="px-2 py-1.5 text-xs">...</span>
                            <button className="px-3 py-1.5 border border-borderDefault rounded-md hover:bg-background text-xs">6</button>
                            <button className="px-3 py-1.5 border border-borderDefault rounded-md hover:bg-background text-xs">{t('pagination.next')}</button>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default InvoicesListPage;