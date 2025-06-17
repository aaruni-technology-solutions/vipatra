import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader'; // Assuming this component is in its own file

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
        // Add more dummy data to test vertical scrolling
        { id: 11, name: "DeepSea Logistics", company: "DeepSea", email: "contact@deepsea.log", phone: "+91 9876543211", outstanding: "78,000", status: "Active" },
        { id: 12, name: "Aarav Patel", company: "-", email: "aarav.p@example.com", phone: "+91 8765432102", outstanding: "2,300", status: "Active" },
        { id: 13, name: "Phoenix Digital", company: "Phoenix", email: "info@phoenix.digital", phone: "+91 7654321093", outstanding: "0.00", status: "Inactive" },
        { id: 14, name: "Evergreen Farms", company: "Evergreen", email: "sales@evergreen.farm", phone: "+91 6543210984", outstanding: "19,500", status: "Active" },
    ];
    const [customers, setCustomers] = useState(initialCustomers);

    const handleNewCustomerClick = () => {
        navigate('/customers/new');
    };

    return (
        // PAGE LAYOUT: Use flexbox to structure the entire component vertically
        <div className="flex flex-col h-full">
            {/* 
              ACTIONHEADER: This is assumed to be sticky top-0 globally.
              It will occupy its own space at the top.
            */}
            <ActionHeader
                title={t('customers.allCustomersTitle', 'All Customers')}
                onNewClick={handleNewCustomerClick}
            />

            {/* 
              MAIN CONTENT CONTAINER: 
              - `flex-grow`: Makes this container take all available vertical space.
              - `flex flex-col`: Lays out its children (the table container and pagination) vertically.
              - `mt-4`: Adds some space below the ActionHeader.
              - `overflow-hidden`: Prevents scrollbars from appearing on this container itself.
            */}
            <div id="customerInitialView" className="dashboard-card flex flex-col flex-grow mt-4 overflow-hidden">
                
                {customers.length > 0 ? (
                    <>
                        {/* 
                          SCROLLABLE TABLE WRAPPER:
                          - `flex-grow`: This is the key. It makes the wrapper expand to fill the available space.
                          - `overflow-auto`: Enables both vertical and horizontal scrollbars when content overflows.
                          This div becomes the scrolling context for the sticky header and column.
                        */}
                        <div className="flex-grow overflow-auto">
                            <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {/* 
                                          STICKY HEADER CELLS (th):
                                          - `sticky top-0`: Sticks to the top of its scrollable parent (the div above).
                                          - `z-20`: Ensures it's above the table body.
                                        */}
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">{t('customers.initialView.table.customerName')}</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">{t('customers.initialView.table.company')}</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">{t('customers.initialView.table.email')}</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">{t('customers.initialView.table.phone')}</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-right font-semibold text-primary border-b border-borderDefault">{t('customers.initialView.table.outstanding')}</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">{t('customers.initialView.table.status')}</th>
                                        
                                        {/* 
                                          STICKY CORNER CELL (th):
                                          - `sticky top-0 right-0`: Sticks to the top-right corner of the scrollable parent.
                                          - `z-30`: Highest z-index to be on top of both header row and action column.
                                        */}
                                        <th className="sticky top-0 right-0 z-30 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">{t('customers.initialView.table.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map(customer => (
                                        <tr key={customer.id} className="hover:bg-background/50">
                                            <td className="p-3 border-b border-borderLight"><Link to={`/customers/${customer.id}`} className="text-primary font-medium hover:text-accent hover:underline">{customer.name}</Link></td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{customer.company}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{customer.email}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{customer.phone}</td>
                                            <td className={`p-3 text-right font-semibold border-b border-borderLight ${parseFloat(customer.outstanding.replace(/,/g, '')) > 0 ? 'text-danger-DEFAULT' : 'text-primary'}`}>₹{customer.outstanding}</td>
                                            <td className="p-3 text-center border-b border-borderLight"><span className={`status-badge ${customer.status === 'Active' ? 'status-active' : 'status-inactive'}`}>{t(`status.${customer.status.toLowerCase()}`)}</span></td>
                                            
                                            {/* 
                                              STICKY ACTION CELL (td):
                                              - `sticky right-0`: Sticks to the right edge of the scrollable parent.
                                              - `z-10`: Sits above other body cells but below the sticky header.
                                              - `bg-white ...`: Needs its own background to hide content scrolling underneath.
                                            */}
                                            <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-white hover:bg-background/50">
                                                <div className="flex justify-center items-center space-x-1">
                                                    <Link to={`/customers/${customer.id}`} className="table-action-btn" title={t('actions.view')}><svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg></Link>
                                                    <button className="table-action-btn" title={t('actions.edit')}><svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* 
                          PAGINATION:
                          - This is outside the scrollable container, so it will always be visible at the bottom.
                          - `flex-shrink-0`: Prevents it from shrinking if space is tight.
                        */}
                        <div className="flex-shrink-0 mt-4 flex justify-end items-center font-sans text-sm text-secondary">
                            <span>{t('pagination.showingRange', { start: 1, end: customers.length, total: customers.length })}</span>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10">
                        {/* No customers found message */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomersListPage;