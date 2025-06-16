// src/pages/Customers/CustomersPage.jsx
import React, { useState, useEffect,useRef } from 'react'; // Added useEffect for completeness
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header'; // Assuming these exist
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';


// --- Action Header Component (Add this above the NewCustomerForm component) ---

const ActionHeader = ({ title, onNewClick }) => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // This effect handles closing the dropdown when clicking outside of it.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Icons for the dropdown menu
    const RightArrow = <svg className="w-4 h-4 ml-auto text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>;
    const SortIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>;
    const ImportIcon = <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" /></svg>;
    const ExportIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v12" /></svg>;
    const PrefsIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.213-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    const RefreshListIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l4.992-4.993m-4.993 0l-3.181 3.183a8.25 8.25 0 000 11.664l3.181 3.183" /></svg>;
    const ResetColumnIcon = <svg className="w-5 h-5 mr-3 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>;

    // The bar is sticky to the top of the main content area.
    // Negative margins pull it into the padding of the parent `main` element to make it full-width.
    return (
        <div className="bg-background/95 backdrop-blur-sm sticky top-0 z-20 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 px-6 sm:px-8 py-3 border-b border-borderLight flex justify-between items-center">
            {/* Left Side */}
            <div className="flex items-center">
                <h2 className="text-xl font-heading text-primary flex items-center cursor-pointer hover:text-accent transition-colors">
                    {title}
                    <svg className="w-5 h-5 ml-1.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </h2>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2">
                 <button onClick={onNewClick} className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2 rounded-lg shadow-sm transition-colors text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span>{t('common.new', 'New')}</span>
                </button>

                <div className="relative" ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-background text-secondary hover:text-primary transition-colors">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl z-30 border border-borderDefault font-sans">
                            <ul className="py-1 text-sm text-primary">
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{SortIcon} <span>Sort by</span> {RightArrow}</li>
                                <li className="px-4 py-2.5 bg-primary/10 text-primary font-medium flex items-center cursor-pointer">{ImportIcon} <span>Import</span> {RightArrow}</li>
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{ExportIcon} <span>Export</span> {RightArrow}</li>
                                <li className="border-t border-borderLight my-1"></li>
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{PrefsIcon} <span>Preferences</span></li>
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{RefreshListIcon} <span>Refresh List</span></li>
                                <li className="px-4 py-2.5 hover:bg-background flex items-center cursor-pointer">{ResetColumnIcon} <span>Reset Column Width</span></li>
                            </ul>
                        </div>
                    )}
                </div>

                 <button className="p-2 rounded-md bg-warning/10 text-warning hover:bg-warning/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                </button>
            </div>
        </div>
    );
};


// --- New Customer Form Component (with Grid Layout) ---
const NewCustomerForm = ({ onSave, onCancel, t }) => {
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
    const [address, setAddress] = useState('');
    const [pan, setPan] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('due_on_receipt');
    const [enablePortal, setEnablePortal] = useState(false);
    const [remarks, setRemarks] = useState('');

    const [otherDetailsOpen, setOtherDetailsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName && customerType === 'individual') { // Simple validation example
            alert(t('customers.newCustomerForm.requiredError', { fieldName: t('customers.newCustomerForm.firstNameLabel')}));
            return;
        }
        if (!companyName && customerType === 'business') {
             alert(t('customers.newCustomerForm.requiredError', { fieldName: t('customers.newCustomerForm.companyNameLabel')}));
            return;
        }
        if (!displayName || !email) {
            alert(t('customers.newCustomerForm.requiredError', {fieldName: 'Display Name and Email'}));
            return;
        }

        const newCustomerData = {
            type: customerType,
            primaryContact: { salutation, firstName, lastName },
            companyName,
            displayName,
            currency: 'INR', // Assuming fixed for now
            email,
            phone: { work: workPhone, mobile },
            otherDetails: otherDetailsOpen ? { address, pan, paymentTerms, enablePortal, remarks } : {},
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

            <form onSubmit={handleSubmit} className="space-y-8"> {/* Increased space-y for sections */}
                {/* Customer Type */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2 font-sans">{t('customers.newCustomerForm.customerTypeLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                    <div className="flex space-x-4">
                        <div className="radio-option flex-1"><input type="radio" id="typeBusiness" name="customerType" value="business" checked={customerType === 'business'} onChange={(e) => setCustomerType(e.target.value)} /><label htmlFor="typeBusiness">{t('customers.initialView.businessType')}</label></div>
                        <div className="radio-option flex-1"><input type="radio" id="typeIndividual" name="customerType" value="individual" checked={customerType === 'individual'} onChange={(e) => setCustomerType(e.target.value)} /><label htmlFor="typeIndividual">{t('customers.initialView.individualType')}</label></div>
                    </div>
                </div>

                {/* Primary Contact - GRID LAYOUT */}
                <fieldset>
                    <legend className="text-lg font-heading text-primary mb-3">{t('customers.newCustomerForm.primaryContactLegend')}</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-5"> {/* 3 columns on sm screens and up */}
                        <div>
                            <label htmlFor="salutation" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.salutationLabel')}</label>
                            <select id="salutation" value={salutation} onChange={e => setSalutation(e.target.value)} className="form-element">
                                <option>Mr.</option><option>Mrs.</option><option>Ms.</option><option>Miss.</option><option>Dr.</option>
                            </select>
                        </div>
                        <div className="sm:col-span-1"> {/* First Name */}
                            <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.firstNameLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="form-element" required={customerType === 'individual'} />
                        </div>
                        <div className="sm:col-span-1"> {/* Last Name */}
                            <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.lastNameLabel')}</label>
                            <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="form-element" />
                        </div>
                    </div>
                </fieldset>

                {/* Company Details - GRID LAYOUT */}
                <fieldset>
                    <legend className="text-lg font-heading text-primary mb-3">{t('customers.newCustomerForm.companyDetailsLegend', 'Company Details')}</legend> {/* Add translation key */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.companyNameLabel')} {customerType === 'business' && <span className="text-danger-DEFAULT">{t('common.required')}</span>}</label>
                            <input type="text" id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} className="form-element" required={customerType === 'business'} />
                        </div>
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.displayNameLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <input type="text" id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder={t('customers.newCustomerForm.displayNamePlaceholder')} className="form-element" required />
                        </div>
                    </div>
                </fieldset>

                {/* Currency & Contact Info - GRID LAYOUT */}
                <fieldset>
                     <legend className="text-lg font-heading text-primary mb-3">{t('customers.newCustomerForm.contactInfoLegend', 'Contact Information')}</legend> {/* Add translation key */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.currencyLabel')}</label>
                            <input type="text" id="currency" defaultValue="INR (Indian Rupee)" className="form-element bg-background" readOnly />
                            <p className="text-xs text-secondary mt-1">{t('customers.newCustomerForm.currencyNote')}</p>
                        </div>
                        <div>
                            <label htmlFor="emailAddress" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.emailAddressLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <input type="email" id="emailAddress" value={email} onChange={e => setEmail(e.target.value)} className="form-element" required />
                        </div>
                        <div>
                            <label htmlFor="workPhone" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.workPhoneLabel')}</label>
                            <input type="tel" id="workPhone" value={workPhone} onChange={e => setWorkPhone(e.target.value)} className="form-element" />
                        </div>
                        <div className="md:col-start-2 lg:col-start-auto"> {/* Adjust column start for mobile if needed */}
                            <label htmlFor="mobilePhone" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.mobileLabel')}</label>
                            <input type="tel" id="mobilePhone" value={mobile} onChange={e => setMobile(e.target.value)} className="form-element" />
                        </div>
                    </div>
                </fieldset>


                {/* Other Details Section (Collapsible) */}
                <div className="border-t border-borderLight pt-6">
                    <button type="button" className="text-primary font-semibold hover:text-accent font-sans text-sm flex items-center space-x-1 mb-4" onClick={() => setOtherDetailsOpen(!otherDetailsOpen)}>
                        <span>{t('customers.newCustomerForm.otherDetailsBtn')}</span>
                        <svg className={`w-4 h-4 transform transition-transform ${otherDetailsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {otherDetailsOpen && (
                        <div className="space-y-5"> {/* Removed pt-5 as fieldset will have it */}
                            <fieldset> {/* Added fieldset for better grouping */}
                                <legend className="sr-only">{t('customers.newCustomerForm.otherDetailsBtn')}</legend> {/* Screen reader only legend */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <div className="md:col-span-2">
                                        <label htmlFor="address" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.addressLabel')}</label>
                                        <textarea id="address" name="address" value={address} onChange={e => setAddress(e.target.value)} rows="3" placeholder={t('customers.newCustomerForm.addressPlaceholder')} className="form-element"></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="pan" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.panLabel')}</label>
                                        <input type="text" id="pan" name="pan" value={pan} onChange={e => setPan(e.target.value)} className="form-element" />
                                    </div>
                                    <div>
                                        <label htmlFor="paymentTerms" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.paymentTermsLabel')}</label>
                                        <select id="paymentTerms" name="paymentTerms" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} className="form-element">
                                            <option value="due_on_receipt">{t('customers.paymentTerms.dueOnReceipt')}</option>
                                            <option value="net_15">{t('customers.paymentTerms.net15')}</option>
                                            <option value="net_30">{t('customers.paymentTerms.net30')}</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="remarks" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('customers.newCustomerForm.remarksLabel')}</label>
                                        <textarea id="remarks" name="remarks" value={remarks} onChange={e => setRemarks(e.target.value)} rows="2" className="form-element"></textarea>
                                    </div>
                                    <div className="md:col-span-2 flex items-center space-x-2">
                                        <input type="checkbox" id="enablePortal" name="enablePortal" checked={enablePortal} onChange={e => setEnablePortal(e.target.checked)} className="h-4 w-4 text-primary border-gray-400 rounded focus:ring-primary" />
                                        <label htmlFor="enablePortal" className="text-sm font-medium text-primary font-sans">{t('customers.newCustomerForm.enablePortalLabel')}</label>
                                    </div>
                                    {/* Placeholder for Contact Persons & Custom Fields - these would be more complex */}
                                    <div className="md:col-span-2"><p className="text-sm text-secondary">{t('customers.newCustomerForm.contactPersonsPlaceholder')}</p></div>
                                    <div className="md:col-span-2"><p className="text-sm text-secondary">{t('customers.newCustomerForm.customFieldsPlaceholder')}</p></div>
                                </div>
                            </fieldset>
                        </div>
                    )}
                </div>
                <hr className="border-borderLight" />
                <div><p className="text-sm text-secondary font-sans">{t('customers.newCustomerForm.customerOwnerNote')} <a href="#" className="text-primary hover:text-accent underline">{t('customers.newCustomerForm.learnMoreLink')}</a></p></div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={onCancel} className="font-sans bg-background hover:bg-borderLight text-secondary px-6 py-3 rounded-lg shadow-sm border border-borderDefault transition-colors">{t('common.cancel')}</button>
                    <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">{t('customers.newCustomerForm.saveBtn')}</button>
                </div>
            </form>
        </section>
    );
};

// --- Main Customers Page Component (CustomersListPage in your App.jsx) ---
const CustomersPage = () => { // Renamed from CustomersListPage to match your file, but it acts as a list page
    const { t } = useTranslation();
    // Dummy data for customer list - replace with API call
    const initialCustomers = [
        { id: 1, name: "Wellness Clinic Pvt. Ltd.", company: "Wellness Clinic", email: "contact@wellness.com", phone: "+91 8012345678", outstanding: "12,500", status: "Active", type: "business" },
        { id: 2, name: "Rohan Sharma", company: "-", email: "rohan.s@example.com", phone: "+91 9876543210", outstanding: "0.00", status: "Active", type: "individual" },
    ];
    const [customers, setCustomers] = useState(initialCustomers);
    const [showCreateForm, setShowCreateForm] = useState(false);


    const handleSaveCustomer = (newCustomerData) => {
        console.log("New Customer to save:", newCustomerData);
        setCustomers(prev => [...prev, { ...newCustomerData, id: Date.now(), outstanding: "0.00", status: "Active" }]);
        setShowCreateForm(false);
    };

    // Add functions for search, filter, pagination later

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    {!showCreateForm ? (
                        <>
                            <ActionHeader
                                title={t('customers.allCustomersTitle', 'All Customers')}
                                onNewClick={() => setShowCreateForm(true)}
                            />

                            {/* Customer List / Initial View */}
                            <div id="customerInitialView" className="dashboard-card">
                                {/* Filters Section */}
                                <div className="mb-6 flex flex-col sm:flex-row gap-4 items-end">
                                    <div className="flex-grow"><label htmlFor="searchCustomer" className="block text-xs font-medium text-primary mb-1">{t('customers.initialView.searchLabel')}</label><input type="text" id="searchCustomer" placeholder={t('customers.initialView.searchPlaceholder')} className="form-element !p-2.5 text-sm" /></div>
                                    <div><label htmlFor="customerTypeFilter" className="block text-xs font-medium text-primary mb-1">{t('customers.initialView.typeFilterLabel')}</label><select id="customerTypeFilter" className="form-element !p-2.5 text-sm"><option value="">{t('customers.initialView.allTypes')}</option><option value="business">{t('customers.initialView.businessType')}</option><option value="individual">{t('customers.initialView.individualType')}</option></select></div>
                                    <div><label htmlFor="customerStatusFilter" className="block text-xs font-medium text-primary mb-1">{t('customers.initialView.statusFilterLabel')}</label><select id="customerStatusFilter" className="form-element !p-2.5 text-sm"><option value="">{t('customers.initialView.allStatuses')}</option><option value="active">{t('customers.initialView.activeStatus')}</option><option value="inactive">{t('customers.initialView.inactiveStatus')}</option></select></div>
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
                                        <svg className="w-16 h-16 text-secondary mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.282-.237-1.887M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.084-1.282.237-1.887m0 0A5.965 5.965 0 0112 13c1.323 0 2.573.408 3.563 1.099M12 13a4 4 0 100-8 4 4 0 000 8zm0 0v1"></path></svg>
                                        <h3 className="text-xl font-heading text-primary mb-2">{t('customers.initialView.noCustomersTitle')}</h3>
                                        <p className="text-secondary font-sans mb-6 max-w-md mx-auto">{t('customers.initialView.noCustomersSubtitle')}</p>
                                        <button className="font-sans text-sm text-primary hover:text-accent underline transition-colors duration-200">{t('customers.initialView.importFromFile')}</button>
                                    </div>
                                )}
                                {/* Pagination */}
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
                            t={t}
                        />
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};


export default CustomersPage; // Changed export name to match filename (convention)