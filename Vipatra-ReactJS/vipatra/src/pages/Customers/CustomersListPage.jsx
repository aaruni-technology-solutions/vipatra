// src/pages/Customers/CustomersPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader'; // Assuming this component is in its own file

// This component is now ONLY for the LIST view.
const CustomersListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Dummy data for the customer list to demonstrate scrolling
    const initialCustomers = [
        { id: 1, name: "Wellness Clinic Pvt. Ltd.", company: "Wellness Clinic", email: "contact@wellness.com", phone: "+91 8012345678", outstanding: "12,500", status: "Active" },
        { id: 2, name: "Rohan Sharma", company: "-", email: "rohan.s@example.com", phone: "+91 9876543210", outstanding: "0.00", status: "Active" },
        { id: 3, name: "GreenScape Gardens", company: "GreenScape", email: "info@greenscape.com", phone: "+91 9988776655", outstanding: "4,200", status: "Active" },
        { id: 4, name: "Priya Singh", company: "-", email: "priya.s@email.com", phone: "+91 9123456789", outstanding: "850", status: "Inactive" },
        { id: 5, name: "Tech Solutions Inc.", company: "Tech Solutions", email: "contact@techsol.io", phone: "+91 8877665544", outstanding: "25,000", status: "Active" },
        { id: 6, name: "Modern Apparel", company: "Modern Apparel", email: "support@modernapparel.com", phone: "+91 7766554433", outstanding: "0.00", status: "Active" },
        { id: 7, name: "City Bakers", company: "City Bakers", email: "orders@citybakers.com", phone: "+91 9876512345", outstanding: "1,500", status: "Active" },
        { id: 8, name: "Quantum Innovations", company: "Quantum", email: "hello@quantum.dev", phone: "+91 8765432109", outstanding: "55,000", status: "Active" },
        { id: 9, name: "Coastal Exporters", company: "Coastal", email: "exports@coastal.in", phone: "+91 7654321098", outstanding: "1,12,000", status: "Active" },
        { id: 10, name: "Sunrise Hotels", company: "Sunrise Group", email: "bookings@sunrise.com", phone: "+91 6543210987", outstanding: "0.00", status: "Active" },
    ];
    const [customers, setCustomers] = useState(initialCustomers);

    // This handler will navigate to the create page
    const handleNewCustomerClick = () => {
        navigate('/customers/new');
    };

    // The component now ONLY returns the content that goes inside the <main> tag.
    // It is wrapped in a React Fragment <></>
    return (
        <>
            {/* The ActionHeader component should have the `sticky top-0` classes in its own file */}
            <ActionHeader
                title={t('customers.allCustomersTitle', 'All Customers')}
                onNewClick={handleNewCustomerClick}
            />

            {/* This div contains all the content that will scroll below the sticky ActionHeader */}
            <div className="mt-6"> {/* The margin-top creates space below the sticky header */}
                <div id="customerInitialView" className="dashboard-card">
                    {/* Filters Section */}
                    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-grow">
                            <label htmlFor="searchCustomer" className="block text-xs font-medium text-primary mb-1">{t('customers.initialView.searchLabel')}</label>
                            <input type="text" id="searchCustomer" placeholder={t('customers.initialView.searchPlaceholder')} className="form-element !p-2.5 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="customerTypeFilter" className="block text-xs font-medium text-primary mb-1">{t('customers.initialView.typeFilterLabel')}</label>
                            <select id="customerTypeFilter" className="form-element !p-2.5 text-sm"><option value="">{t('customers.initialView.allTypes')}</option><option value="business">{t('customers.initialView.businessType')}</option><option value="individual">{t('customers.initialView.individualType')}</option></select>
                        </div>
                        <div>
                            <label htmlFor="customerStatusFilter" className="block text-xs font-medium text-primary mb-1">{t('customers.initialView.statusFilterLabel')}</label>
                            <select id="customerStatusFilter" className="form-element !p-2.5 text-sm"><option value="">{t('customers.initialView.allStatuses')}</option><option value="active">{t('customers.initialView.activeStatus')}</option><option value="inactive">{t('customers.initialView.inactiveStatus')}</option></select>
                        </div>
                        <button type="button" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2.5 rounded-lg shadow-soft text-sm">{t('common.filterBtn')}</button>
                    </div>

                    {/* Customer Table */}
                    {customers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] text-sm font-sans">
                                <thead className="bg-background border-b border-borderDefault">
                                    <tr>
                                        <th className="p-3 text-left font-semibold text-primary">{t('customers.initialView.table.customerName')}</th>
                                        <th className="p-3 text-left font-semibold text-primary">{t('customers.initialView.table.company')}</th>
                                        <th className="p-3 text-left font-semibold text-primary">{t('customers.initialView.table.email')}</th>
                                        <th className="p-3 text-left font-semibold text-primary">{t('customers.initialView.table.phone')}</th>
                                        <th className="p-3 text-right font-semibold text-primary">{t('customers.initialView.table.outstanding')}</th>
                                        <th className="p-3 text-center font-semibold text-primary">{t('customers.initialView.table.status')}</th>
                                        <th className="p-3 text-center font-semibold text-primary">{t('customers.initialView.table.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map(customer => (
                                        <tr key={customer.id} className="border-b border-borderLight hover:bg-background/50">
                                            <td className="p-3"><Link to={`/customers/${customer.id}`} className="text-primary font-medium hover:text-accent hover:underline">{customer.name}</Link></td>
                                            <td className="p-3 text-secondary">{customer.company}</td>
                                            <td className="p-3 text-secondary">{customer.email}</td>
                                            <td className="p-3 text-secondary">{customer.phone}</td>
                                            <td className={`p-3 text-right font-semibold ${parseFloat(customer.outstanding.replace(/,/g, '')) > 0 ? 'text-danger-DEFAULT' : 'text-primary'}`}>₹{customer.outstanding}</td>
                                            <td className="p-3 text-center"><span className={`status-badge ${customer.status === 'Active' ? 'status-active' : 'status-inactive'}`}>{t(`status.${customer.status.toLowerCase()}`)}</span></td>
                                            <td className="p-3 text-center">
                                                <div className="flex justify-center items-center space-x-1">
                                                    <Link to={`/customers/${customer.id}`} className="table-action-btn" title={t('actions.view')}><svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg></Link>
                                                    <button className="table-action-btn" title={t('actions.edit')}><svg viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            {/* No customers found message */}
                        </div>
                    )}
                    
                    {/* Pagination */}
                    <div className="mt-6 flex justify-end items-center font-sans text-sm text-secondary">
                        <span>{t('pagination.showingRange', { start: 1, end: customers.length, total: customers.length })}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomersListPage;