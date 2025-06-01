// src/pages/Customers/CustomersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For "Create one now" link if needed
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';

// Dummy Data - Replace with API calls
const initialCustomers = [
    { id: 1, name: "Wellness Clinic Pvt. Ltd.", company: "Wellness Clinic", email: "contact@wellness.com", phone: "+91 8012345678", outstanding: "12,500", status: "Active", type: "business" },
    { id: 2, name: "Rohan Sharma", company: "-", email: "rohan.s@example.com", phone: "+91 9876543210", outstanding: "0.00", status: "Active", type: "individual" },
];

// --- New Customer Form Component (can be in the same file or imported) ---
const NewCustomerForm = ({ onSave, onCancel, t }) => {
    // State for form fields (simplified for brevity, add all your fields)
    const [customerType, setCustomerType] = useState('business');
    const [salutation, setSalutation] = useState('Mr.');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [workPhone, setWorkPhone] = useState('');
    const [mobile, setMobile] = useState('');
    // Add other states for address, PAN, payment terms, etc.
    const [otherDetailsOpen, setOtherDetailsOpen] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation example
        if (!firstName || !companyName || !displayName || !email) {
            alert(t('customers.newCustomerForm.requiredError', {fieldName: 'Required fields'})); // Generic message
            return;
        }
        const newCustomerData = {
            type: customerType,
            salutation,
            firstName,
            lastName,
            companyName,
            displayName,
            email,
            workPhone,
            mobile,
            // ... other fields
        };
        onSave(newCustomerData);
    };

    return (
        <section className="dashboard-card">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-heading text-primary">{t('customers.newCustomerForm.title')}</h3>
                <button onClick={onCancel} className="text-secondary hover:text-danger-DEFAULT transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div className="bg-accent/10 border border-accent-dark text-accent-dark p-3 rounded-lg mb-6 text-sm font-sans">
                {t('customers.newCustomerForm.prefillNote')} <a href="#" className="font-semibold underline hover:text-accent-dark/70">{t('customers.newCustomerForm.prefillLink')}</a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Type */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2 font-sans">{t('customers.newCustomerForm.customerTypeLabel')} <span className="text-danger-DEFAULT">*</span></label>
                    <div className="flex space-x-4">
                        <div className="radio-option flex-1"><input type="radio" id="typeBusiness" name="customerType" value="business" checked={customerType === 'business'} onChange={(e) => setCustomerType(e.target.value)} /><label htmlFor="typeBusiness">{t('customers.initialView.businessType')}</label></div>
                        <div className="radio-option flex-1"><input type="radio" id="typeIndividual" name="customerType" value="individual" checked={customerType === 'individual'} onChange={(e) => setCustomerType(e.target.value)} /><label htmlFor="typeIndividual">{t('customers.initialView.individualType')}</label></div>
                    </div>
                </div>

                {/* Primary Contact */}
                <fieldset>
                    <legend className="text-lg font-heading text-primary mb-2">{t('customers.newCustomerForm.primaryContactLegend')}</legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-5">
                        <div><label htmlFor="salutation" className="block text-xs font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.salutationLabel')}</label><select id="salutation" value={salutation} onChange={e => setSalutation(e.target.value)} className="form-element !p-2.5 text-sm"><option>Mr.</option><option>Mrs.</option><option>Ms.</option><option>Miss.</option><option>Dr.</option></select></div>
                        <div className="md:col-span-1"><label htmlFor="firstName" className="block text-xs font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.firstNameLabel')} <span className="text-danger-DEFAULT">*</span></label><input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="form-element !p-2.5 text-sm" required /></div>
                        <div className="md:col-span-1"><label htmlFor="lastName" className="block text-xs font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.lastNameLabel')}</label><input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="form-element !p-2.5 text-sm" /></div>
                    </div>
                </fieldset>

                {/* Company Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                    <div><label htmlFor="companyName" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.companyNameLabel')} <span className="text-danger-DEFAULT">*</span></label><input type="text" id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} className="form-element" required /></div>
                    <div><label htmlFor="displayName" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.displayNameLabel')} <span className="text-danger-DEFAULT">*</span></label><input type="text" id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder={t('customers.newCustomerForm.displayNamePlaceholder')} className="form-element" required /></div>
                </div>

                {/* Currency */}
                <div><label htmlFor="currency" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.currencyLabel')}</label><input type="text" id="currency" defaultValue="INR (Indian Rupee)" className="form-element bg-background" readOnly /><p className="text-xs text-secondary mt-1">{t('customers.newCustomerForm.currencyNote')}</p></div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-5">
                    <div><label htmlFor="emailAddress" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.emailAddressLabel')} <span className="text-danger-DEFAULT">*</span></label><input type="email" id="emailAddress" value={email} onChange={e => setEmail(e.target.value)} className="form-element" required /></div>
                    <div><label htmlFor="workPhone" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.workPhoneLabel')}</label><input type="tel" id="workPhone" value={workPhone} onChange={e => setWorkPhone(e.target.value)} className="form-element" /></div>
                    <div><label htmlFor="mobilePhone" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.mobileLabel')}</label><input type="tel" id="mobile" value={mobile} onChange={e => setMobile(e.target.value)} className="form-element" /></div>
                </div>

                {/* Other Details Section (Collapsible) */}
                <div>
                    <button type="button" className="text-primary font-semibold hover:text-accent font-sans text-sm flex items-center space-x-1" onClick={() => setOtherDetailsOpen(!otherDetailsOpen)}>
                        <span>{t('customers.newCustomerForm.otherDetailsBtn')}</span>
                        <svg className={`w-4 h-4 transform transition-transform ${otherDetailsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {otherDetailsOpen && (
                        <div className="mt-4 space-y-5 border-t border-borderLight pt-5">
                            {/* Add Address, Contact Persons, Custom Fields, Remarks, PAN, etc. here with their state and t() */}
                            <div><label htmlFor="address" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.addressLabel')}</label><textarea id="address" name="address" rows="3" placeholder={t('customers.newCustomerForm.addressPlaceholder')} className="form-element"></textarea></div>
                            <div><p className="text-sm text-secondary">{t('customers.newCustomerForm.contactPersonsPlaceholder')}</p></div>
                            <div><p className="text-sm text-secondary">{t('customers.newCustomerForm.customFieldsPlaceholder')}</p></div>
                            <div><label htmlFor="remarks" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.remarksLabel')}</label><textarea id="remarks" name="remarks" rows="2" className="form-element"></textarea></div>
                            <div><label htmlFor="pan" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.panLabel')}</label><input type="text" id="pan" name="pan" className="form-element" /></div>
                            <div>
                                <label htmlFor="paymentTerms" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customers.newCustomerForm.paymentTermsLabel')}</label>
                                <select id="paymentTerms" name="paymentTerms" className="form-element">
                                    <option value="due_on_receipt">{t('customers.paymentTerms.dueOnReceipt')}</option>
                                    <option value="net_15">{t('customers.paymentTerms.net15')}</option>
                                    <option value="net_30">{t('customers.paymentTerms.net30')}</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-2"><input type="checkbox" id="enablePortal" name="enablePortal" className="h-4 w-4 text-primary border-gray-400 rounded focus:ring-primary" /><label htmlFor="enablePortal" className="text-sm font-medium text-primary font-sans">{t('customers.newCustomerForm.enablePortalLabel')}</label></div>
                            {/* ... more fields from your HTML ... */}
                        </div>
                    )}
                </div>
                <hr className="border-borderLight" />
                <div><p className="text-sm text-secondary font-sans">{t('customers.newCustomerForm.customerOwnerNote')} <a href="#" className="text-primary hover:text-accent underline">{t('customers.newCustomerForm.learnMoreLink')}</a></p></div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={onCancel} className="font-sans bg-background hover:bg-borderLight text-secondary px-6 py-3 rounded-lg shadow-sm border border-borderDefault transition-colors">{t('customers.newCustomerForm.cancelBtn')}</button>
                    <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">{t('customers.newCustomerForm.saveBtn')}</button>
                </div>
            </form>
        </section>
    );
};


// --- Main Customers Page Component ---
const CustomersPage = () => {
    const { t } = useTranslation();
    const [customers, setCustomers] = useState(initialCustomers);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Add functions for search, filter, pagination later
    // Add function to handle saving new customer
    const handleSaveCustomer = (newCustomerData) => {
        console.log("New Customer to save:", newCustomerData);
        // Here you would typically make an API call to save the customer
        // For now, just add to local state and hide form
        setCustomers(prev => [...prev, { ...newCustomerData, id: Date.now(), outstanding: "0.00", status: "Active" }]); // Add some defaults
        setShowCreateForm(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> {/* Make sure "Customers" link is active here */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    {!showCreateForm ? (
                        <>
                            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <h2 className="text-3xl font-heading text-primary">{t('customers.manageTitle')}</h2>
                                    <p className="text-secondary font-sans mt-1">{t('customers.manageSubtitle')}</p>
                                </div>
                                <div className="mt-4 sm:mt-0">
                                    <button onClick={() => setShowCreateForm(true)} className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span>{t('customers.createCustomerBtn')}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Customer List / Initial View */}
                            <div id="customerInitialView" className="dashboard-card">
                                <div className="mb-6 flex flex-col sm:flex-row gap-4 items-end">
                                    <div className="flex-grow"><label htmlFor="searchCustomer" className="block text-xs font-medium text-primary mb-1">{t('customers.initialView.searchLabel')}</label><input type="text" id="searchCustomer" placeholder={t('customers.initialView.searchPlaceholder')} className="form-element !p-2.5 text-sm" /></div>
                                    <div><label htmlFor="customerTypeFilter" className="block text-xs font-medium text-primary mb-1">{t('customers.initialView.typeFilterLabel')}</label><select id="customerTypeFilter" className="form-element !p-2.5 text-sm"><option value="">{t('customers.initialView.allTypes')}</option><option value="business">{t('customers.initialView.businessType')}</option><option value="individual">{t('customers.initialView.individualType')}</option></select></div>
                                    <div><label htmlFor="customerStatusFilter" className="block text-xs font-medium text-primary mb-1">{t('customers.initialView.statusFilterLabel')}</label><select id="customerStatusFilter" className="form-element !p-2.5 text-sm"><option value="">{t('customers.initialView.allStatuses')}</option><option value="active">{t('customers.initialView.activeStatus')}</option><option value="inactive">{t('customers.initialView.inactiveStatus')}</option></select></div>
                                    <button type="button" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2.5 rounded-lg shadow-soft text-sm">{t('common.filterBtn')}</button>
                                </div>

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
                                                        <td className={`p-3 text-right font-semibold ${parseFloat(customer.outstanding) > 0 ? 'text-danger-DEFAULT' : 'text-primary'}`}>₹{customer.outstanding}</td>
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
                                        <svg className="w-16 h-16 text-secondary mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.282-.237-1.887M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.084-1.282.237-1.887m0 0A5.965 5.965 0 0112 13c1.323 0 2.573.408 3.563 1.099M12 13a4 4 0 100-8 4 4 0 000 8zm0 0v1"></path></svg>
                                        <h3 className="text-xl font-heading text-primary mb-2">{t('customers.initialView.title')}</h3>
                                        <p className="text-secondary font-sans mb-6 max-w-md mx-auto">{t('customers.initialView.subtitle')}</p>
                                        <button className="font-sans text-sm text-primary hover:text-accent underline transition-colors duration-200">{t('customers.initialView.importFromFile')}</button>
                                    </div>
                                )}
                                {/* Pagination (if needed) */}
                                <div className="mt-6 flex justify-end items-center font-sans text-sm text-secondary">
                                    <span>{t('pagination.showingRange', {start: 1, end: customers.length, total: customers.length})}</span>
                                    {/* Add actual pagination controls later */}
                                </div>
                            </div>
                        </>
                    ) : (
                        <NewCustomerForm
                            onSave={handleSaveCustomer}
                            onCancel={() => setShowCreateForm(false)}
                            t={t} // Pass t function to the form component
                        />
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default CustomersPage;

